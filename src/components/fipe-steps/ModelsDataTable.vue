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
        <v-data-table
            v-else
            :headers="headers"
            item-key="nome"
            :items="models"
            :items-per-page="6"
            class="elevation-1"
            :footer-props="{
                showFirstLastPage: true,
                'items-per-page-text':'Marcas por página',
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
          models: [],
          isLoading: true,
          selectedModel: null,
      };
  },
  methods: {
      async fetchModels() {
          this.isLoading = true
          this.models = (await BaseService.get(this.selectedCategory + '/marcas/' + this.selectedBrand + '/modelos')).modelos
          this.isLoading = false
      }
  },
  mounted() {
      this.fetchModels();
  },
}
</script>

<style scoped>
.brand {
    min-height: 300px;
}
</style>