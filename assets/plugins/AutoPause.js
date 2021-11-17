class AutoPause{
    constructor(){
        this.threshold = 0.25
        this.handlerIntesection = this.handlerIntesection.bind(this)
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this)
    }
    run(player){
        this.player = player
        const observer = new IntersectionObserver(this.handlerIntesection, {
            threshold: this.threshold,
        })
        observer.observe(this.player.media)

        document.addEventListener('visibilitychange', this.handleVisibilityChange)
    }
    handlerIntesection(entries){
        const entry = entries[0]
        const isVisible = entry.intersectionRatio >= this.threshold
        if(isVisible){
            this.player.play()
        } else {
            this.player.pause()
        }
    }
    handleVisibilityChange(){
        const isVisible = document.visibilityState === 'hidden'
        isVisible
            ? this.player.pause()
            : this.player.play()
    }
}
export default AutoPause