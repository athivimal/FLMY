import { Component, OnInit } from "@angular/core";
import { IMqttMessage, MqttService } from "ngx-mqtt";

// view all lora packets (including gateway packets)
// mosquitto_sub -h 192.168.0.103 -p 1883 -t "#" -v
// mosquitto_sub -h 192.168.0.103 -p 1883 -t "application/+/device/+/rx" -v

// dummy publish message to test mqtt broker
// mosquitto_pub -h 192.168.0.103 -p 1883 -t kt-data/1 -m 'hi'

@Component({
  selector: "app-mqtt-dash",
  templateUrl: "./mqtt-dash.component.html",
  styleUrls: ["./mqtt-dash.component.scss"]
})
export class MqttDashComponent implements OnInit {
  //application/1/device/0004a30b001f9f3c/rx

  sampleRx = {
    applicationID: "1",
    applicationName: "kt-app",
    deviceName: "kt9",
    devEUI: "0004a30b001f9f3c",
    rxInfo: [
      {
        mac: "9191914224359250",
        rssi: -36,
        loRaSNR: 9.3,
        name: "",
        latitude: 0,
        longitude: 0,
        altitude: 0
      }
    ],
    txInfo: {
      frequency: 868100000,
      dataRate: {
        modulation: "LORA",
        bandwidth: 125,
        spreadFactor: 7
      },
      adr: false,
      codeRate: "4/5"
    },
    fCnt: 1,
    fPort: 1,
    data: "d2F0ZXJsZXZlbCwyMzg="
  };

  //application/[applicationID]/node/[devEUI]/tx

  sampleTx = {
    reference: "abcd1234", // reference which will be used on ack or error (this can be a random string)
    confirmed: true, // whether the payload must be sent as confirmed data down or not
    fPort: 10, // FPort to use (must be > 0)
    data: "....", // base64 encoded data (plaintext, will be encrypted by LoRa Server)
    object: {
      // decoded object (when application coded has been configured)
      temperatureSensor: {
        "1": 25
      }, // when providing the 'object', you can omit 'data'
      humiditySensor: {
        "1": 32
      }
    }
  };

  public message: string;
  incoming;
  loraPackets = [
    {
      adr: false,
      applicationID: "1",
      applicationName: "kt-app",
      count: 1,
      data: "6769",
      devEUI: "0004a30b001f3cd0",
      deviceName: "mc1",
      fCnt: 68,
      fPort: 30,
      object: {
        a: "6769",
        len: 4
      },
      rxInfo: [
        {
          gatewayID: "9191914224359250",
          loRaSNR: 8.8,
          location: {
            altitude: 400,
            latitude: 11.0188892,
            longitude: 76.93548659999999
          },
          name: "kt-microchip-gateway",
          rssi: -81
        }
      ],
      txInfo: {
        dr: 0,
        frequency: 868100000
      }
    }
  ];
  duplicate = false;
  i = 0;

  downData = {
    reference: "abcd1234", // reference which will be used on ack or error (this can be a random string)
    confirmed: true, // whether the payload must be sent as confirmed data down or not
    fPort: 10,
    data: "MA==" // FPort to use (must be > 0)
  };

  constructor(private _mqttService: MqttService) {
    this._mqttService
      .observe("application/+/device/+/rx")
      .subscribe((message: IMqttMessage) => {
        this.message = message.payload.toString();
        this.incoming = JSON.parse(message.payload.toString());
        console.log(this.incoming);
        this.incoming.data = atob(this.incoming.data);

        this.duplicate = false;

        if (this.loraPackets.length > 0) {
          for (this.i = 0; this.i < this.loraPackets.length; this.i++) {
            if (
              this.loraPackets[this.i].deviceName === this.incoming.deviceName
            ) {
              this.loraPackets[this.i].data = this.incoming.data;
              this.loraPackets[this.i].count += 1;
              this.duplicate = true;
            }
          }
          if (!this.duplicate) {
            this.incoming.count = 1;
            this.loraPackets.push(this.incoming);
          }
        } else {
          this.incoming.count = 1;
          this.loraPackets.push(this.incoming);
          console.log(this.loraPackets);
        }
        //this.sendDownLink(this.incoming.data);
        // this.motorControlDownLink(this.incoming.data);
      });
    console.log(this.loraPackets);
  }

  lastPacket = "";

  motorControlDownLink(data) {
    console.log(data);
    var dataArray = data.split(",");
    if (dataArray.length == 2) {
      var dlData = dataArray[1];
      console.log("dldata" + dlData);
      if (parseInt(dlData) < 5 && this.lastPacket != "MQ==") {
        this.directDownLink("MQ==");
        this.lastPacket = "MQ==";
      } else if (parseInt(dlData) > 5 && this.lastPacket != "MA==") {
        this.directDownLink("MA==");
        this.lastPacket = "MA==";
      }
    }
  }

  directDownLink(val) {
    this.downData.data = val;
    var dlNode = "application/1/device/0004a30b00200d67/tx";
    this.unsafePublish(dlNode, JSON.stringify(this.downData));
    console.log(this.downData);
  }

  sendDownLink(data) {
    console.log(data);
    var dataArray = data.split(",");
    if (dataArray.length == 2) {
      //var dlNode = 'application/1/node/' + dataArray[0] + '/tx';
      var dlNode = "application/1/node/0004a30b00200d67/tx";
      var dlData = btoa(dataArray[1]);
      var dlPort = Math.floor(Math.random() * 244) + 1; // Random No 1 - 244 (!= 0)

      this.downData.data = dlData;
      this.downData.reference = "1234abcd" + dlPort;
      this.downData.fPort = dlPort;
      this.unsafePublish(dlNode, JSON.stringify(this.downData));
      console.log(this.downData);
    }
  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {
      qos: 1,
      retain: true
    });
  }

  ngOnInit() {}
}

//application/1/node/0004a30b00200d67/rx
//application/2/node/+/rx
