<template>
    <div class="brand">
        <transition name="fade" mode="out-in">
            <info-model-modal 
                v-if="selectedModel"
                @close="selectedModel = null"
                :selectedModel="selectedModel"
                :selectedCategory="selectedCategory"
                :selectedBrand="selectedBrand"
            >
            </info-model-modal>
        </transition>
        
        <div v-if="isLoading">
            <v-skeleton-loader
                type="table"
            ></v-skeleton-loader>
        </div>
        <div v-else>
            <v-text-field
                filled label="Busque por um modelo..." 
                v-model="searchModel"
                append-icon="mdi-magnify"
                @input="filterModels()"
            ></v-text-field>
            <v-data-table
                no-data-text="Nenhum modelo encontrado"
                :headers="headers"
                item-key="nome"
                :items="filteredModels"
                :items-per-page="6"
                class="elevation-1"
                :footer-props="{
                    showFirstLastPage: true,
                    'items-per-page-text':'Modelos por página',
                    'items-per-page-all-text':'Todas',
                    
                }"
            >
                <template v-slot:item.actions="{ item }">
                    <div @click="selectedModel = item.codigo">
                        <a >Ver anos disponíveis</a>
                    </div>
                </template>
            </v-data-table>
        </div>
        
        
    </div>
</template>

<script>
import BaseService from '@/services/BaseService'
import InfoModelModal from './modals/InfoModelModal.vue';

export default {
    components: { InfoModelModal },
    name: 'ModelsDataTable',
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
                { text: 'Modelo', value: 'nome' },
                { text: 'Ação', value: 'actions' },
            ],
            allModels: [],
            filteredModels: [],
            isLoading: true,
            selectedModel: null,
            searchModel: null
        };
    },
    methods: {
        async fetchModels() {
            this.isLoading = true
            this.models = (await BaseService.get(this.selectedCategory + '/marcas/' + this.selectedBrand + '/modelos')).modelos
            this.filteredModels = this.models
            this.isLoading = false
        },
        filterModels() {
            if(this.filteredModels) {
                this.filteredModels = this.models.filter(element => element.nome.toLowerCase().includes(this.searchModel.toLowerCase()))
            } else {
                this.filteredModels = this.models
            }            
        }
    },
    mounted() {
        this.fetchModels();
    },
    watch: {
        selectedBrand() {
            this.fetchModels()
        }
    }
}
</script>

<style scoped>
.brand {
    min-height: 300px;
}
</style>