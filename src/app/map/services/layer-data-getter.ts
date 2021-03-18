export class LayerDataGetter {
  private layer: number[][] = []

  private getMaxRowValue(maxValue: number, row:number[]):number {
    return row.reduce((maxRowValue, value):number => {
        if(value>maxRowValue) maxRowValue = value;
        return maxRowValue;
    }, maxValue)
  }

  private getMaxValue(){
    return this.layer.reduce((maxValue:number, row: number[]):number => {
        const maxRowValue = this.getMaxRowValue(maxValue, row)
        if(maxRowValue>maxValue) maxValue = maxRowValue;
        return maxValue
    },0)
  }

  private getPercentage(value:number):number {
    let numbers = 0;
    let above = 0;
    this.layer.forEach(row=>{
        row.forEach(number=>{
            numbers++;
            if (number > value) above++;
        })
    })
    return above / numbers;
  }

  private getDistribution() {
    const levels = []
    for(let i=0;i<1; i+=0.05) { levels.push(i) }
    return levels.map(level=> ({ level: level.toFixed(2), value: (this.getPercentage(level)*100).toFixed(1)}))
  }

  public getLayerData(layer: number[][]) {
    this.layer = layer;
    const max = this.getMaxValue()
    const distribution = this.getDistribution()
    return {
        distribution,
        max,
    }
  }
}
