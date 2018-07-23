<template>
    <div>
        <div class="hoursWrapper">
            <div v-show="!storeHours.isOpen" class="centerText" entry-animation="slide-down-animation">
                <div class="hoursTitle">Pro Advisors will be</div>
                <div class="hoursTitle">available <span class="bold">{{storeHours.openDay}}</span> at</div>
                <div class="hoursTime">{{storeHours.openHours}}</div>
            </div>

            <div v-show="storeHours.isOpen" class="centerText">
                <div class="hoursTitle">Pro Advisors are available</div>
                <div class="hoursTime">NOW</div>
            </div>

            <div class="blue-bar"></div>
            <div class="hours">hours</div>

            <div v-for="(dayOfWeek, index) in storeHours" :key="dayOfWeek.id">
                <div class="entryWrapper">
                    <div class="dayName bold">{{_getFullDayFromId(index)}}</div>
                    <div class="timeWrapper">
                        <div v-for="(day, i) in dayOfWeek" :key="i">
                            <div class="dayTime">{{day}}</div>
                        </div>
                    </div>
                </div>
                <hr class="dayDivider">
            </div>
            <div class="disclaimer">
                Disclaimer: Pros are independent advisors, please review<span on-tap="termsConditions">&nbsp;Terms & Conditions</span> for details
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment-timezone';
import Loading from 'vue-loading-overlay';
export default {
    name: 'ProchatHome',
    components: {
        Loading
    },
    data() {
        return {
            hours: [],
            isLoading: false,
            isOpen: false,
            openHours: [],
            openDay: '',
            storeHours: {}
        };
    },
    beforeMount() {
        this.getHours();
    },
    methods: {
        getHours() {
            this.isLoading = false;
            axios
                .get(`https://api.diyz.com/core/callrequests/hours`)
                .then(response => {
                    response = response.data;

                    this.storeHours = this._formatStoreHours(response);
                    this._formatAvailability();
                    this.storeHours.hours = this.storeHours;
                    this.storeHours.isOpen = this.isOpen;
                    this.storeHours.openHours = this.openHours;
                    this.storeHours.openDay = this.openDay;
                })
                .catch(() => {
                    this.isLoading = false;
                });
        },
        _getFullDayFromId(id) {
            return [
                'SUNDAY',
                'MONDAY',
                'TUESDAY',
                'WEDNESDAY',
                'THURSDAY',
                'FRIDAY',
                'SATURDAY'
            ][id];
        },
        _formatAvailability() {
            let nextOpen;
            let dayOfWeek = new Date().getDay();
            let now = moment().format('HH:mm');
            // check if store will be opening at any time today
            this.storeHours.forEach(hours => {
                if (hours[0] !== 'Closed') {
                    let storeOpenInUserTZ = hours[0].split(' - ')[0];
                    if (
                        now <=
                        moment(storeOpenInUserTZ, 'hh:mmA').format('HH:mm')
                    ) {
                        this.openHours = storeOpenInUserTZ;
                        this.openDay = 'Today';
                        nextOpen = true;
                    }
                }
            });
            // if not open anymore today find next day that store is open
            while (!nextOpen) {
                dayOfWeek = dayOfWeek === 6 ? 0 : dayOfWeek + 1;
                this.storeHours[dayOfWeek].forEach(openDay => {
                    if (openDay !== 'Closed' && !nextOpen) {
                        this.openHours = openDay.split(' - ')[0];
                        this.openDay = this._getFullDayFromId(dayOfWeek);
                        nextOpen = true;
                    }
                });
            }
        },
        _formatStoreHours(response) {
            let storeHours = [];
            storeHours.length = 7;
            let userTZ;
            try {
                userTZ = moment.tz.guess();
            } catch (e) {
                // console.log('e: ', e);
            }
            let dayOfWeek = new Date().getDay();
            let now = moment().format('HH:mm');
            let todayHours;

            response.forEach(day => {
                let start = moment
                    .tz(day.start, 'hh:mm', day.timeZone)
                    .day(day.dayId);
                let userStart = start.clone().tz(userTZ);
                let end = moment
                    .tz(day.end, 'hh:mm', day.timeZone)
                    .day(day.dayId);
                let userEnd = end.clone().tz(userTZ);

                if (
                    start.day() === userStart.day() &&
                    end.day() === userEnd.day()
                ) {
                    // TODO put in array using the userStart and userEnd
                    if (storeHours[day.dayId] === undefined) {
                        storeHours[day.dayId] = [
                            userStart.format('hh:mmA') +
                                ' - ' +
                                userEnd.format('hh:mmA')
                        ];
                    } else {
                        storeHours[day.dayId].push(
                            userStart.format('hh:mmA') +
                                ' - ' +
                                userEnd.format('hh:mmA')
                        );
                    }
                } else if (
                    start.day() !== userStart.day() &&
                    end.day() !== userEnd.day()
                ) {
                    if (storeHours[userStart.day()] === undefined) {
                        storeHours[userStart.day()] = [
                            userStart.format('hh:mmA') +
                                ' - ' +
                                userEnd.format('hh:mmA')
                        ];
                    } else {
                        storeHours[userStart.day()].push(
                            userStart.format('hh:mmA') +
                                ' - ' +
                                userEnd.format('hh:mmA')
                        );
                    }
                } else {
                    // TODO create an entry that has userStart to midnight
                    if (storeHours[userStart.day()] === undefined) {
                        storeHours[userStart.day()] = [
                            userStart.format('hh:mmA') + ' - ' + '11:59PM'
                        ];
                    } else {
                        storeHours[userStart.day()].push(
                            userStart.format('hh:mmA') + ' - ' + '11:59PM'
                        );
                    }
                    // TODO create a second entry that is midnight to userEnd
                    if (storeHours[userEnd.day()] === undefined) {
                        if (userEnd.format('hh:mmA') !== '12:00AM') {
                            storeHours[userEnd.day()] = [
                                '12:00AM - ' + userEnd.format('hh:mmA')
                            ];
                        }
                    } else {
                        if (userEnd.format('hh:mmA') !== '12:00AM') {
                            storeHours[userEnd.day()].push(
                                '12:00AM - ' + userEnd.format('hh:mmA')
                            );
                        }
                    }
                }
                // }
            });

            // Replace any missing entries with Closed
            let missing = [0, 1, 2, 3, 4, 5, 6];
            storeHours.forEach((entry, idx) => {
                missing.splice(missing.indexOf(idx), 1);
            });
            missing.forEach(item => {
                storeHours[item] = ['Closed'];
            });
            // sort dates with multiple openings to be in ascending order by open time
            storeHours = storeHours.map(item => {
                return item.sort(function(a, b) {
                    return (
                        moment(a.split(' - ')[0], 'hh:mmA').format('HH') -
                        moment(b.split(' - ')[0], 'hh:mmA').format('HH')
                    );
                });
            });
            todayHours = storeHours[dayOfWeek];
            todayHours.forEach(hours => {
                if (hours !== 'Closed') {
                    let storeOpenInUserTZ = hours.split(' - ')[0];
                    let storeCloseInUserTZ = hours.split(' - ')[1];
                    if (
                        now <=
                            moment(storeCloseInUserTZ, 'hh:mmA').format(
                                'HH:mm'
                            ) &&
                        now >=
                            moment(storeOpenInUserTZ, 'hh:mmA').format('HH:mm')
                    ) {
                        this.isOpen = true;
                    }
                }
            });
            return storeHours;
        }
    }
};
</script>

<style scoped>
.disclaimer {
    text-align: center;
    margin: 25px;
    padding: 0 5%;
    font-size: 12px;
}

.disclaimer span {
    color: #0ab8e2;
    cursor: pointer;
}
.blue-bar {
    margin: 3px auto;
    border: 10px solid rgb(10, 184, 226);
    max-width: 360px;
}
.hoursTitle {
    font-family: 'Roboto', serif;
    font-size: 18px;
    font-weight: normal;
}
.hoursTime {
    padding: 25px 0;
    font-family: 'Roboto-Bold', serif;
    font-size: 44px;
}
.bold {
    font-weight: bold;
}
.hours {
    font-family: 'Roboto', serif;
    font-size: 18px;
    text-transform: uppercase;
    margin: 15px 0 20px 0;
    font-weight: bold;
    text-align: center;
}
.dayName {
    font-family: 'Roboto-Bold', serif;
    font-size: 15px;
    line-height: 15px;
    flex: 0.33;
}
.dayTime {
    font-family: 'Roboto', serif;
    font-size: 16px;
    line-height: 22px;
    flex: 1;
}
.dayDivider {
    border-top: 1px solid rgb(227, 227, 227);
    margin: 15px auto 20px auto;
    max-width: 360px;
}
.entryWrapper {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    padding: 0 25px;
    max-width: 360px;
}
.centerText {
    width: 100%;
    text-align: center;
}
.hoursWrapper {
    margin-top: 22px;
}
.timeWrapper {
    display: flex;
    flex-direction: column;
    flex: 0.66;
    align-items: flex-end;
}
</style>
