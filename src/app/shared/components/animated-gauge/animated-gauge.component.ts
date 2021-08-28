// import { Component, OnInit } from '@angular/core';
import { Component, Inject, NgZone, PLATFORM_ID, OnInit, AfterViewInit, Input, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
@Component({
  selector: 'app-animated-gauge',
  templateUrl: './animated-gauge.component.html',
  styleUrls: ['./animated-gauge.component.scss']
})
export class AnimatedGaugeComponent implements OnInit {
  @Input() value: any;
  @Input() name: any; 
  private chart: am4charts.XYChart;

  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    console.log("hello")
  }

  ngAfterViewInit() {
    am4core.useTheme(am4themes_animated);
    // Create chart
    let chart = am4core.create(`chartanimated${this.name}`, am4charts.GaugeChart);
    // configure series
    // Create axis
    let axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>()); 
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    // Set inner radius
    chart.innerRadius = -20;
    // Add ranges
    let range = axis.axisRanges.create();
    range.value = 0;
    range.endValue = 70;
    range.axisFill.fillOpacity = 1;
    range.axisFill.fill = am4core.color("#88AB75");
    range.axisFill.zIndex = - 1;
    
    let range2 = axis.axisRanges.create();
    range2.value = 70;
    range2.endValue = 90;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = am4core.color("#DBD56E");
    range2.axisFill.zIndex = - 1;
    
    let range3 = axis.axisRanges.create();
    range3.value = 90;
    range3.endValue = 100;
    range3.axisFill.fillOpacity = 1;
    range3.axisFill.fill = am4core.color("#DE8F6E");
    range3.axisFill.zIndex = - 1;
    
    // Add hand
    let hand = chart.hands.push(new am4charts.ClockHand());
    hand.value = this.value;
    hand.pin.disabled = true;
    hand.fill = am4core.color("#2D93AD");
    hand.stroke = am4core.color("#2D93AD");
    // hand.innerRadius = am4core.percent(50);
    hand.radius = am4core.percent(80);
    hand.startWidth = 15;
    // Set theme
    
// let hand2 = chart.hands.push(new am4charts.ClockHand());
// hand2.value = 22;
// hand2.pin.disabled = true;
// hand2.fill = am4core.color("#7D7C84");
// hand2.stroke = am4core.color("#7D7C84");
// hand2.innerRadius = am4core.percent(50);
// hand2.radius = am4core.percent(80);
// hand2.startWidth = 15;

// Animate
// setInterval(function() {
  // console.log(this.value,"val")
  // hand.showValue(this.value, am4core.ease.cubicOut);
  // hand2.showValue(Math.random() * 100, 1000, am4core.ease.cubicOut);
// }, 2000);
  }
}
