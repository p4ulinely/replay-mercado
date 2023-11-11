<template>
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
        :loading="gettingReplay"/>
    <br><br>
    <InlineMessage severity="error" v-show="invalidInputs"> 
        Informe um ativo válido e preencha uma data disponível.
    </InlineMessage>
</template>

<script>
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import AutoComplete from 'primevue/autocomplete';
import InlineMessage from 'primevue/inlinemessage';

export default {
    name: 'ReplayView',
    components: {
        Calendar,
        ButtonComponent: Button,
        AutoComplete,
        InlineMessage
    },
    data() {
        return {
            deactivateInputs: false,
            gettingReplay: false,
            invalidInputs: false,
            labelGetReplayButton: 'Obter replay',
            tick: '',
            targetDate: '',
            ticksList: ['petr3', 'petr4', 'dolfut', 'indfut'],
            filteredTicks: [],
        }
    },
    methods: {
        getTickData() {
            console.log('targetDate:', this.targetDate)
        },
        searchTicks() {
            this.filteredTicks = this.ticksList.filter(
                (f) => f.includes(this.tick.trim()));
            // console.log('filteredTicks', this.filteredTicks)
        },
        getReplay() {
            let validInputs =
                this.filteredTicks.includes(this.tick) && this.targetDate != '';

            if (!validInputs){
                this.invalidInputs = true;
                return
            }

            this.deactivateInputs = true;
            this.gettingReplay = true;
            this.invalidInputs = false;

            this.labelGetReplayButton = 'Obtendo...';

            // TODO: request to get replay data
            // console.log('this.tick', this.tick)
            // console.log('this.targetDate', this.targetDate)
            // console.log('filteredTicks', this.filteredTicks)
        }
    }
}
</script>