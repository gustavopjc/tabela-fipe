<template>
  <v-dialog
    v-model="selectedModel"
    scrollable 
    persistent
    max-width="600px"
    transition="dialog-transition"
  >
    <v-card>
        <v-card-title>Informações do modelo</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 500px;" class="mt-4">
          <v-tabs
            dark
            background-color="teal darken-3"
            show-arrows
          >
            <v-tabs-slider color="teal lighten-3"></v-tabs-slider>

            <v-tab
              v-for="year in years"
              :key="year.codigo"
              @click.native="fetchModelInfo(year.codigo)"
            >
              {{ year.nome }}
            </v-tab>
          </v-tabs>
          teste sla
        </v-card-text>
      </v-card>
  </v-dialog>
</template>

<script>
import BaseService from '@/services/BaseService'

export default {
  name: 'InfoModelModal',
  props: ['selectedModel', 'selectedBrand', 'selectedCategory'],
  data() {
    return {
      isLoading: false,
      years: []
    }
  },
  computed: {
    baseUrl() {
      return this.selectedCategory + '/marcas/' + this.selectedBrand + '/modelos/' + this.selectedModel + '/anos'
    }
  },
  methods: {
    async fetchYearsByModel() {
      this.isLoading = true
      this.years = await BaseService.get(this.baseUrl)
      this.isLoading = false
    },
    fetchModelInfo(item) {
      console.log(item)
    }
  },
  mounted() {
    this.fetchYearsByModel()
  }
}
</script>

<style lang="scss" scoped>

</style>