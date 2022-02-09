<template>
    <div class="brand">
        
        <div v-if="isLoading">
            <v-skeleton-loader
                type="table"
            ></v-skeleton-loader>
        </div>
        <v-data-table
            v-else
            :headers="headers"
            show-select
            :single-select="true"
            item-key="nome"
            v-model="brand"
            :items="brands"
            :items-per-page="6"
            class="elevation-1"
            :footer-props="{
                showFirstLastPage: true,
                'items-per-page-text':'Marcas por página',
                'items-per-page-all-text':'Todas',
                
            }"
        >
        </v-data-table>
        
    </div>
</template>

<script>
import BaseService from '@/services/BaseService'

export default {
    name: 'SecondStep',
    props: {
        selectedBrand: {
            required: true,
        },
        selectedCategory: {
            required: true,
        },
    },
    data() {
        return {
            headers: [
                { text: '# Código', value: 'codigo' },
                { text: 'Marca', value: 'nome' },
            ],
            brands: [],
            isLoading: true,
        };
    },
    computed: {
        brand: {
            get() {
                return this.selectedBrand
            },
            set (value) {
                this.updateSelectedBrand(value)
            }
        }
    },
    methods: {
        updateIsValidated(value) {
            console.log(value);
            this.$emit('update-is-validated', value);
        },
        updateSelectedBrand(value) {
            this.$emit('update-selected-brand', value);
            this.updateIsValidated(value.length > 0)
        },
        async fetchBrands() {
            this.isLoading = true
            this.brands= await BaseService.get(this.selectedCategory + '/marcas')
            this.isLoading = false
        }
    },
    mounted() {
        this.updateIsValidated(this.selectedBrand.length > 0);
        this.fetchBrands();
    },
}
</script>

<style scoped>
.brand {
    min-height: 300px;
}
</style>