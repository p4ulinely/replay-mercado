<template>
    <div id="body">
        <p><span class="pi pi-replay"></span> ReplayView</p>
        <AutoComplete
            placeholder="Ex.: PETR3"
            v-model="tick"
            :suggestions="filteredTicks"
            @complete="searchTicks"
            :field="item => item"
            :disabled="deactivateInputs"
        />
        <br><br>
        <Calendar
            field="targetDate"
            v-model="targetDate"
            :disabled="deactivateInputs"
            showIcon
        />
        <br><br>
        <ButtonComponent
            @click="getReplay"
            :label="labelGetReplayButton"
            :loading="gettingReplay"
        />
        <br><br>
        <InlineMessage severity="error" v-show="invalidInputs">{{ errorMessage }}</InlineMessage>
    </div>
    <br>
    <div v-show="replayHasData">
        <ReplayPanelComponent
            :replayData="replayData"
            v-on:replay-finished="replayFinished"
        />
    </div>
</template>

<script>
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import AutoComplete from 'primevue/autocomplete';
import InlineMessage from 'primevue/inlinemessage';
import ReplayPanelComponent from '../components/ReplayPanelComponent.vue';
// import { defineAsyncComponent } from 'vue';

// const ReplayPanelComponent = defineAsyncComponent(() => import('../components/ReplayPanelComponent.vue'));
// const ReplayPanelComponent = defineAsyncComponent({
//     loader: () => import('../components/ReplayPanelComponent.vue'),
//     delay: 1000
// });

export default {
    name: 'ReplayView',
    components: {
        Calendar,
        ButtonComponent: Button,
        AutoComplete,
        InlineMessage,
        ReplayPanelComponent
    },
    data() {
        return {
            deactivateInputs: false,
            gettingReplay: false,
            invalidInputs: false,
            errorMessage: '',
            labelGetReplayButton: 'Obter replay',
            labelsToGetReplayButton: ['Obter replay', 'Obtendo...'],
            tick: '',
            targetDate: '',
            ticksList: ['petr3', 'petr4', 'dolfut', 'indfut'],
            filteredTicks: [],
            replayData: {
                info: {
                    tick: '',
                    targetDate: '',
                },
                data: []
            }
        }
    },
    computed: {
        replayHasData() {
            return this.replayData.data.length > 0;
        }
    },
    methods: {
        searchTicks() {
            this.filteredTicks = this.ticksList.filter((f) => f.includes(this.tick.trim()));
        },
        resetReplayData() {
            this.replayData = {
                info: {
                    tick: '',
                    targetDate: '',
                },
                data: []
            };
        },
        preGettingReplay(val) {
            this.resetReplayData();

            this.deactivateInputs = val;
            this.gettingReplay = val;

            if (this.invalidInputs)
                this.invalidInputs = !val;

            this.labelGetReplayButton = val
                ? this.labelsToGetReplayButton[1]
                : this.labelsToGetReplayButton[0];
        },
        getReplay() {
            let validInputs =
                this.filteredTicks.includes(this.tick) && this.targetDate != '';

            let sameInputs = 
                this.replayData.info.tick === this.tick
                && this.replayData.info.targetDate === this.targetDate;

            if (!validInputs){
                this.invalidInputs = true;
                this.errorMessage = 'Informe um ativo válido e preencha uma data disponível.';
                return
            } else if (sameInputs) {
                this.invalidInputs = true;
                this.errorMessage = 'Dados já carregados.';
                return
            }

            this.preGettingReplay(true);

            // TODO: request to get replay data
            setTimeout(() => {
                this.preGettingReplay(false);

                this.replayData = {
                    info: {
                        tick: this.tick,
                        targetDate: this.targetDate,
                    },
                    data: [
                        {
                            id: '12323123',
                            date: '20231111',
                            buyer: '12',
                            seller: '14',
                            price: 4995.5,
                            initiative: 'seller'
                        },
                        {
                            id: '12323124',
                            date: '20231111',
                            buyer: '144',
                            seller: '166',
                            price: 4996,
                            initiative: 'buyer'
                        },
                    ]
                };
            }, 1000);
        },
        replayFinished() {
            // this.resetReplayData();
        },
    }
}
</script>