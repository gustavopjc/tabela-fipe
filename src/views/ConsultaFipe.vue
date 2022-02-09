<template>
  <div>
    <v-row no-gutters>
      <v-col
        cols="12"
        md="4"
        class="text-center text-xs-center"
      >
        <v-autocomplete
          filled
          v-model="selectedCategory"
          item-text="title"
          item-value="value"
          :items="categories"
          @change="updateBrands()"
        ></v-autocomplete>


        <v-autocomplete
          filled
          v-model="selectedBrand"
          :loading="isLoadingBrands"
          :items="brands"
          item-text="nome"
          item-value="codigo"
        ></v-autocomplete>

        <v-btn color="primary" class="float-left" dark @click.native="clearForm()">Limpar dados</v-btn>
        <v-btn color="primary" 
          class="float-right" 
          dark @click.native="showModelDataTable = true"
          :disabled="!this.selectedBrand || !this.selectedCategory"
        >
          Consultar
        </v-btn>

      </v-col>
      <v-col cols="12" md="8" class="pl-8">
        <models-data-table :selectedCategory="selectedCategory" :selectedBrand="selectedBrand" v-if="showModelDataTable">
        </models-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BaseService from '@/services/BaseService';
import ModelsDataTable from '@/components/fipe-steps/ModelsDataTable.vue'

  export default {
    name: 'Home',
    components: {
      ModelsDataTable,
    },
    data() {
      return {
        selectedCategory: null,
        categories: [
            { title: 'Carros', value: 'carros'},
            { title: 'Motos', value: 'motos'},
            { title: 'Caminhões', value: 'caminhoes'},
        ],
        isLoadingBrands: false,
        selectedBrand: null,
        brands: [],
        showModelDataTable: false,
      }
    },
    methods: {
      async fetchBrandsByCategory() {
        this.isLoadingBrands = true
        this.brands= await BaseService.get(this.selectedCategory + '/marcas')
        this.isLoadingBrands = false
      },
      clearCategory() {
        this.categories = []
        this.categorySelected = null
      },
      clearBrand(){
        this.brands = []
        this.selectedBrand = null
      },
      clearForm() {
        this.clearCategory()
        this.clearBrand()
      },
      async updateBrands() {
        this.showModelDataTable = false
        if(this.selectedCategory) {
          await this.fetchBrandsByCategory()
        } else {
          this.clearBrand()
        }
      }
    }
  }
</script>
