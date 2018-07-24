export default {
    methods: {
        formatDate(dt) {
            if (dt) {
                let arr = dt.split('-');
                return `${arr[1]}/${arr[2]}/${arr[0]}`;
            }
        }
    }
};
