import { SharedModule } from './shared/shared.module';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// App, Core and Routing Module
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
//import { config } from "../environments/config";

/* Angular Material*/
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

/* http, rjx */
import { HttpClientModule } from "@angular/common/http";

/* Gauge Plugin */
import { NgxGaugeModule } from "ngx-gauge";

import { MqttModule, IMqttServiceOptions } from "ngx-mqtt";

import { AgmCoreModule } from "@agm/core";
import { UsersComponent } from "./users/users.component";

import { GaugeChartModule } from "angular-gauge-chart";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from "@angular/http";

// cloud mqtt broker free
// https://diyprojects.io/8-online-mqtt-brokers-iot-connected-objects-cloud#.XQeVObwzZnI
// HiveMq = host -> broker.hivemq.com, ws port -> 8000, tcp port -> 1883,
// Mosquitto =  host -> iot.eclipse.org, ws port -> 1883 / 8883, tcp port -> X,

// // for esp cloud mqtt
//export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  //hostname: "mqtt.eclipse.org", // "192.168.1.100",
  //port: 1883,
  //path: "" //"/ws"
//};

// // for esp
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: "broker.hivemq.com", // "192.168.1.100",
  port:8000,
  path: "/mqtt",
  protocol : "ws" //(environment.mqtt.protocol === "wss") ? 'wss': 'ws'
 };
 console.log(MQTT_SERVICE_OPTIONS);

// For loraserver
// export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
//   //hostname: "192.168.43.216", // "192.168.1.100",
//   hostname: "192.168.0.103", // "192.168.1.100",
//   port: 1884,
//   path: "/ws" //"/ws"
// };

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    AgmCoreModule.forRoot({
      apiKey: ""
    }),
    HttpModule,
    HttpClientModule,
    NgxGaugeModule,
    GaugeChartModule,
    FormsModule,
    SharedModule,
    NgbModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
