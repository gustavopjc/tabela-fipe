<template>
    <div class="brand">
        <transition name="fade" mode="out-in">
          <info-model-modal v-if="model.length > 0"
            @close="model = []">
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
            show-select
            :single-select="true"
            item-key="nome"
            v-model="model"
            :items="models"
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
import InfoModelModal from '../modals/InfoModelModal.vue';

export default {
  components: { InfoModelModal },
  name: 'ThirdStep',
  props: {
      selectedBrand: {
          required: true,
      },
      selectedCategory: {
          required: true,
      },
      selectedModel: {
          required: true,
      },
  },
  data() {
      return {
          headers: [
              { text: '# Código', value: 'codigo' },
              { text: 'Modelo', value: 'nome' },
          ],
          models: [],
          isLoading: true,
      };
  },
  computed: {
      model: {
          get() {
              return this.selectedModel
          },
          set (value) {
              this.updateSelectedModel(value)
          }
      }
  },
  methods: {
      updateIsValidated(value) {
          console.log(value);
          this.$emit('update-is-validated', value);
      },
      updateSelectedModel(value) {
          this.$emit('update-selected-model', value);
          this.updateIsValidated(value.length > 0)
      },
      async fetchModels() {
          this.isLoading = true
          this.models = (await BaseService.get(this.selectedCategory + '/marcas/' + this.selectedBrand[0].codigo + '/modelos')).modelos
          this.isLoading = false
      }
  },
  mounted() {
      this.updateIsValidated(this.selectedModel.length > 0);
      this.fetchModels();
  },
}
</script>

<style scoped>
.brand {
    min-height: 300px;
}
</style>