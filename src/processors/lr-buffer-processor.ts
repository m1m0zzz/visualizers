class LRBufferProcessor extends AudioWorkletProcessor {
  private bufferL: number[] = []
  private bufferR: number[] = []
  private readonly frameSize = 512

  process(inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
    const input = inputs[0]
    const output = outputs[0]
    const inputL = input[0]
    const inputR = input[1]

    for (let ch = 0; ch < input.length; ch++) {
      const inChannel = input[ch]
      const outChannel = output[ch]
      for (let i = 0; i < inChannel.length; i++) {
        outChannel[i] = inChannel[i]
      }
    }

    if (!inputL || !inputR) return true

    this.bufferL.push(...inputL)
    this.bufferR.push(...inputR)

    if (this.bufferL.length >= this.frameSize) {
      this.port.postMessage({
        left: this.bufferL.slice(0, this.frameSize),
        right: this.bufferR.slice(0, this.frameSize),
      })
      this.bufferL = this.bufferL.slice(this.frameSize)
      this.bufferR = this.bufferR.slice(this.frameSize)
    }

    return true
  }
}

registerProcessor("lr-buffer-processor", LRBufferProcessor)
