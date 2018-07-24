export default {
    methods: {
        formatUrlTitle(title) {
            title = title.trim();
            title = title.replace(/[:?!&']/g, '');
            return title.toLowerCase().replace(/\s/g, '-');
        }
    }
};
