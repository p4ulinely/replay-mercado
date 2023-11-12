<template>
<div id="body">
    <Panel :header="panelTitle" toggleable>
        <div id="replayControl" class="">
            <SelectButton
                v-model="timeValue"
                :options="timeOptions"
                aria-labelledby="basic"
                severity="warning"
                @change="changeTime"
            />

            <Button severity="warning" icon="pi pi-play" @click="playData" v-show="!replayControl.started" />
            <Button severity="warning" icon="pi pi-pause" @click="pauseData" v-show="replayControl.started" />
            <Button severity="warning" icon="pi pi-stop-circle" @click="stopData" aria-label="Submit" />
        </div>
        <br> 
        <Skeleton 
            height="2rem"
            class="mb-2"
            borderRadius="16px"
            v-show="!replayControl.started && !replayControl.finished"
        >
        </Skeleton>
        <!-- <span class="m-6" v-show="replayControl.started">{{ currentDeal }}</span> -->
        <br>
            <DataTable
                v-if="replayControl.started"
                :value="dataFeed"
                tableStyle="min-width: 50rem"
                scrollable scrollHeight="200px"
            >
                <Column field="id" header="ID"></Column>
                <Column field="time" header="H"></Column>
                <Column field="price" header="P"></Column>
                <Column field="quantity" header="Q"></Column>
                <Column field="buyer" header="C"></Column>
                <Column field="seller" header="V"></Column>
                <Column field="initiative" header="I"></Column>
            </DataTable>

    </Panel>
</div>
</template>

<script>
import Panel from 'primevue/panel';
import Skeleton from 'primevue/skeleton';
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
    name: 'ReplayPanelComponent',
    data() {
        return {
            timeValue: '1.0 secs',
            timeOptions: ['0.5 secs', '1.0 secs', '2.0 secs', '3.0 secs'],
            currentDeal: '',
            polling: null,
            indexPolling: 0,
            replayControl: {
                currentIndexPolling: -1,
                started: false,
                paused: false,
                finished: false,
            },
            dataFeed: []
        }
    },
    components: {
        Panel,
        Skeleton,
        Button,
        SelectButton,
        DataTable,
        Column
    },
    computed: {
        panelTitle() {
            return `Replay para '${this.replayData.info.tick}'`;
        },
    },
    watch: {

    },
    props: {
        replayData: Object,
    },
    methods: {
        playData() {
            this.replayControl.started = true;
            this.replayControl.paused = false;

            if (this.replayControl.finished) {
                this.currentDeal = '';
                this.dataFeed = [];
            }

            this.pollingData();
        },
        pauseData() {
            this.replayControl.currentIndexPolling = this.indexPolling;
            this.replayControl.paused = true;
            this.replayControl.started = false;
            clearInterval(this.polling);
        },
        stopData() {
            this.replayControl.finished = true;
            this.replayControl.started = false;
            this.indexPolling = 0;

            clearInterval(this.polling);

            this.$emit('replay-finished', this.replayData.info.tick);
        },
        getTimeInMilliseconds() {
            let timeInSecs = parseFloat(this.timeValue.split(" ")[0]);
            return timeInSecs * 1000;
        },
        changeTime() {
            const onTheFly = this.replayControl.started;

            if (onTheFly) {
                this.pauseData();
                this.playData();
            }
        },
        pollingData() {
            let milliseconds = this.getTimeInMilliseconds();
            
            if (this.replayControl.finished) {
                this.indexPolling = 0;
                this.replayControl.finished = false;
            } else if (this.replayControl.paused) {
                this.indexPolling = this.replayControl.currentIndexPolling;
                this.replayControl.paused = false;
            }

            this.polling = setInterval(() => {
                if (this.indexPolling === this.replayData.data.length) {
                    console.log(`LIMIT this.indexPolling - ${this.replayData.info.tick}:`, this.indexPolling);
                    this.stopData();
                }
                else {
                    this.currentDeal = this.replayData.data[this.indexPolling] // TODO: it won't be needed. take it off later..
                    this.dataFeed.unshift(this.replayData.data[this.indexPolling]);// TODO: ask user if top-down or bottom-up
                    this.indexPolling += 1;
                }
            }, milliseconds)
        }
    },
    emits: ['replay-finished'],
    beforeUnmount () {
        clearInterval(this.polling);
        this.indexPolling = 0;
    },
    // mounted() {
    //     console.log('mounted ReplayPanelComponent')
    // },
    // created() {
    //     console.log('created ReplayPanelComponent')
    // }
    // mounted() {
        // this.currentDeal = this.replayData.data[this.indexData];
        // this.indexData += 1;

        // this.currentDeal = replayMotor(this.replayData.data);
        // let iterator = getDeal(this.replayData.data, index);
        
        // console.log('iterator', iterator);
        // console.log('this.replayData.data', this.replayData.data);


        // for (let index = 0; index < this.replayData.data.length; index++) {
        //     let iterator = getDeal(this.replayData.data, index);
        //     let value = tapeReadingMotor(iterator);
        //     console.log('index:', index);
        //     console.log('tapeReadingMotor(iterator):', value);
            
        //     setTimeout(() => {
        //         this.currentDeal = value;
        //     }, 1000);
            
        // }
    // },
}
</script>

<style scoped>
.replayControl {

    padding: 10px 10px;
}

.pi-play, .pi-stop-circle {
    cursor: pointer;
}
</style>