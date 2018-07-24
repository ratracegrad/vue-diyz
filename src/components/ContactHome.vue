<template>
    <div>
        <img src="../images/contact-header.jpg" class="header-picture"
             v-bind:style="{ backgroundColor: 'lightgray', height: height, backgroundSize: 'cover' }" />
        <div class="contact-wrapper">
            <h1 class="header">We want to hear from you,
                Do-It-Yourselfer! Got a question, comment or compliment?
                Give us a shout, we're all ears.</h1>
            <input type="text" name="fullname" id="fullname" placeholder="Name" required />
            <input type="email" name="email" id="email" placeholder="Email Address" required />
            <select>
                <option value="">Reason for contacting:</option>
                <option value="Project Ideas">Project Ideas</option>
                <option value="Pro Advice">Pro Advice</option>
                <option value="Media Relations">Media Relations</option>
                <option value="General Support">General Support</option>
            </select>
            <textarea placeholder="Message"></textarea>
            <button>SUBMIT</button>
        </div>
    </div>
</template>

<script>
import setImageHeight from '../mixins/setImageHeight.js';

export default {
    name: 'ContactHome',
    mixins: [setImageHeight]
};
</script>

<style scoped>
.header-picture {
    width: 100%;
    margin: 0 auto;
    object-fit: cover;
}
.contact-wrapper {
    max-width: 1440px;
    margin: 20px auto;
    padding: 0 30px;
}
.header {
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    line-height: 20px;
    text-align: center;
    padding: 0 25px;
    margin-top: 20px;
    margin-bottom: 25px;
    font-weight: normal;
}
button,
input,
select,
textarea {
    background-color: transparent;
    color: inherit;
    width: 100%;
    height: 48px;
    border: 1px solid rgb(231, 231, 231);
    margin-bottom: 15px;
    padding: 0 10px;
}
textarea {
    height: 72px;
}
button {
    color: black;
    background-color: #ffd100;
    font-weight: bold;
    text-align: center;
    line-height: 48px;
    font-size: 17px;
    border: none;
}

@media screen and (max-width: 620px) {
    .contact-wrapper {
        width: 100%;
        padding: 0 15px;
        box-sizing: border-box;
    }
}
</style>
