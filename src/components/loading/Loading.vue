<template>
   <v-card
      height="300"
      width="100%"
      v-if="loading"
    >
          <v-overlay
            opacity="0.7"
            :value="true"
            absolute
            >
                <v-progress-circular
                    :width="5"
                    color="primary"
                    size="45"
                    :indeterminate="true"
                ></v-progress-circular>
        </v-overlay>
   </v-card>
</template>

<script>
export default {
    name: 'Loading',
    props: {
        loading: {
            required: true,
            type: Boolean,
            default: true
        },
    }
}
</script>

<style>
.loading {
    height: 80%;
    
}
</style>