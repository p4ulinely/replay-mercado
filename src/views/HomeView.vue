<template>
    <Card>
        <template #title>Replays de mercado <span class="pi pi-chart-line"></span></template>
        <template #content>
            <p class="m-0">
                Tenha como revisitar os acontecimentos de mercado, de forma fácil e rápida...
            </p>
        </template>
    </Card>

    <!-- <Divider /> -->
    <br>
    <Card style="width: 80%">
        <template #header>
            <img style="width: 80%" alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
        </template>
        <template #title> Advanced Card </template>
        <template #subtitle> Card subtitle </template>
        <template #content>
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                quas!
            </p>
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Save" />
            <Button icon="pi pi-times" label="Cancel" severity="secondary" style="margin-left: 0.5em" />
        </template>
    </Card>
</template>

<script>
import Card from 'primevue/card';
import Button from 'primevue/button';
import Divider from 'primevue/divider';

export default {
    name: 'HomeView',
    components: {
        Card,
        Button,
        Divider
    },
    data() {
        return {

        }
    }
}
</script>