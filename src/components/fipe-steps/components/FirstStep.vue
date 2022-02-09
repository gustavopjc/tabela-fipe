<template>
    <div>
        <div class="text-center text-steps" >
            Escolha a categoria do veículo para poder prosseguir com a consulta
        </div>
        <div class="categories">
            <v-chip-group @change="updateSelectedCategory"
                    v-model="category" center-active>
                    <v-chip v-for="category in categories"
                        :key="category.value"
                        :value="category.value"
                        color="primary"
                        :outlined="selectedCategory !== category.value"
                        large
                    >
                        {{ category.title }}
                    </v-chip>
                </v-chip-group>
        </div>
    </div>
 
</template>

<script>
export default {
    props: {
        selectedCategory: {
            required: true,
        },
    },
    data() {
        return {
            categories: [
                { title: 'Carros', value: 'carros'},
                { title: 'Motos', value: 'motos'},
                { title: 'Caminhões', value: 'caminhoes'},
            ],
        };
    },
    computed: {
        category: {
            get() {
                return this.selectedCategory
            },
            set (value) {
                this.updateSelectedCategory(value)
            }
        }
    },
    methods: {
        updateIsValidated(value) {
            this.$emit('update-is-validated', value);
        },
        updateSelectedCategory(value) {
            this.$emit('update-selected-category', value);
            this.updateIsValidated(!!value)
        }
    },
    mounted() {
        this.updateIsValidated(!!this.selectedCategory);
    }
}
</script>

<style scoped>
.categories >>> .v-slide-group__content {
    justify-content: center !important;
}

.categories >>> .v-chip--active {
    color: white !important;
}

.text-steps{
    font-weight: 500 ;
    font-size: 1.3rem;
    margin: 20px;
}
</style>