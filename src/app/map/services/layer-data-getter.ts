export class LayerDataGetter {
  private layer: number[][] = []

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
    for(let i=0;i<=1; i+=0.05) { levels.push(i) }
    return levels.map(level=> ({ level: level.toFixed(2), value: (this.getPercentage(level)*100).toFixed(1)}))
  }

  public getLayerData(layer: number[][]) {
    this.layer = layer;
    const distribution = this.getDistribution()
    return {
        distribution,
    }
  }
}
