export default {
    data() {
        return {
            height: this.setImageHeight()
        };
    },
    mounted() {
        this.$nextTick(function() {
            window.addEventListener('resize', this.setImageHeight);
            this.setImageHeight();
        });
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.setImageHeight);
    },
    methods: {
        setImageHeight() {
            if (window.innerWidth <= 620) {
                this.height = (Math.round(window.innerWidth) * 9) / 16 + 'px';
            } else if (window.innerWidth >= 1060) {
                this.height = '450px';
            } else {
                this.height = (window.innerWidth * 9) / 16;
            }
        }
    }
};
