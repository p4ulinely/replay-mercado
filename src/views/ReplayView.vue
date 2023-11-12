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
    <ReplayPanelComponent
        v-if="activateReplayPanel"
        :replayData="replayData"
        v-on:replay-finished="replayFinished"
    />
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
        // ReplayPanelComponent: () => import('../components/ReplayPanelComponent.vue'),
    },
    data() {
        return {
            activateReplayPanel: false,
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
                this.activateReplayPanel = true;

                this.replayData = {
                    info: {
                        tick: this.tick,
                        targetDate: this.targetDate,
                    },
                    data: [
                        {
                            "price": "5.037,88",
                            "quantity": 5,
                            "buyer": "072-Bradesco",
                            "seller": "147-Ativa",
                            "time": "17:59:59",
                            "id": 38664,
                            "initiative": "Vendedor"
                        },
                        {
                            "price": "5.037,88",
                            "quantity": 15,
                            "buyer": "746-LEV",
                            "seller": "147-Ativa",
                            "time": "17:59:59",
                            "id": 38663,
                            "initiative": "Vendedor"
                        },
                        {
                            "price": "5.038,38",
                            "quantity": 5,
                            "buyer": "085-BTG",
                            "seller": "127-Tullett",
                            "time": "17:59:58",
                            "id": 38662,
                            "initiative": "Comprador"
                        },
                        {
                            "price": "5.038,38",
                            "quantity": 5,
                            "buyer": "003-XP",
                            "seller": "127-Tullett",
                            "time": "17:59:58",
                            "id": 38661,
                            "initiative": "Comprador"
                        },
                        {
                            "price": "5.038,89",
                            "quantity": 5,
                            "buyer": "059-Safra",
                            "seller": "1618-Ideal",
                            "time": "17:59:50",
                            "id": 38660,
                            "initiative": "Comprador"
                        },
                        {
                            "price": "5.038,89",
                            "quantity": 5,
                            "buyer": "059-Safra",
                            "seller": "1618-Ideal",
                            "time": "17:59:50",
                            "id": 38659,
                            "initiative": "Comprador"
                        },
                        {
                            "price": "5.037,88",
                            "quantity": 5,
                            "buyer": "008-UBS",
                            "seller": "088-Capital",
                            "time": "17:59:39",
                            "id": 38658,
                            "initiative": "Comprador"
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