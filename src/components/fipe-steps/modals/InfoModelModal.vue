<template>
  <v-dialog
    v-model="selectedModel"
    max-width="600px"
    persistent
    transition="dialog-transition"
  >
    <v-card>
        <v-icon class="float-right mr-2 mt-2" @click="$emit('close')">mdi-close</v-icon>
        <v-card-title>Informações do modelo</v-card-title>
        <v-divider></v-divider>
        <v-card-text  class="mt-4">
          <div class="tabs">
            <div class="d-flex row" v-if="isLoadingTabs">
              <v-skeleton-loader
                v-for="n in 7"
                :key="n"
                type="button"
                class="ma-2"
              ></v-skeleton-loader>
            </div>
            <v-tabs
              v-else
              v-model="tabSelected"
              dark
              background-color="teal darken-3"
              show-arrows
            >
              <v-tabs-slider color="teal lighten-3"></v-tabs-slider>

              <v-tab
                v-for="year in years"
                :key="year.codigo"
              >
                {{ year.nome }}
              </v-tab>
            </v-tabs>
          </div>
          <div class="content" v-if="yearSelected">
            <div v-if="isLoadingContent">
              <v-skeleton-loader
                v-for="n in 2"
                :key="n"
                type="article"
              ></v-skeleton-loader>
            </div>
            <div v-else>
              <vehicle-info :vehicleInfo="vehicleInfo">
              </vehicle-info>
            </div>
          </div>
        </v-card-text>
      </v-card>
  </v-dialog>
</template>

<script>
import BaseService from '@/services/BaseService'
import VehicleInfo from '../components/VehicleInfo';

export default {
  name: 'InfoModelModal',
  props: ['selectedModel', 'selectedBrand', 'selectedCategory'],
  components: {
    VehicleInfo
  },
  data() {
    return {
      isLoadingTabs: false,
      isLoadingContent: false,
      vehicleInfo: null,
      tabSelected: null,
      years: []
    }
  },
  computed: {
    baseUrl() {
      return this.selectedCategory + '/marcas/' + this.selectedBrand + '/modelos/' + this.selectedModel + '/anos'
    },
    yearSelected() {
      return this.tabSelected !== -1 ? this.years[this.tabSelected] : null
    }
  },
  watch: {
    tabSelected: {
      immediate: true,
      handler() {
        if(this.yearSelected) {
          this.fetchModelInfo()
        }
      }
    }
  },
  methods: {
    async fetchYearsByModel() {
      this.isLoadingTabs = true
      this.years = await BaseService.get(this.baseUrl)
      this.isLoadingTabs = false
    },
    async fetchModelInfo() {
      this.isLoadingContent = true
      this.vehicleInfo = await BaseService.get(this.baseUrl + '/' + this.yearSelected.codigo)
      this.isLoadingContent = false
    }
  },
  mounted() {
    this.fetchYearsByModel()
  }
}
</script>

<style lang="scss" scoped>

</style>