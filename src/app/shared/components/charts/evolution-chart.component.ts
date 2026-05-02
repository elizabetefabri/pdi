import { Component, input } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';

export interface EvolutionPoint {
  month: string;
  value: number;
}

@Component({
  selector: 'app-evolution-chart',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './evolution-chart.component.html',
  styleUrl: './evolution-chart.component.scss',
})
export class EvolutionChartComponent {
  readonly title = input<string>('Evolução');
  readonly data = input.required<EvolutionPoint[]>();

  get options(): EChartsOption {
    const points = this.data();
    return {
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: points.map((p) => p.month),
        axisLine: { lineStyle: { color: 'var(--color-border)' } },
        axisLabel: { color: 'var(--color-text-muted)', fontSize: 11 },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        axisLine: { lineStyle: { color: 'var(--color-border)' } },
        axisLabel: { color: 'var(--color-text-muted)', fontSize: 11 },
        splitLine: { lineStyle: { color: 'var(--color-border)', type: 'dashed' } },
      },
      series: [
        {
          name: this.title(),
          type: 'line',
          data: points.map((p) => p.value),
          smooth: true,
          lineStyle: { color: 'var(--color-primary)', width: 2 },
          itemStyle: { color: 'var(--color-primary)' },
          areaStyle: { color: 'var(--color-primary)', opacity: 0.08 },
        },
      ],
      grid: { left: 40, right: 16, top: 16, bottom: 32 },
    };
  }
}
