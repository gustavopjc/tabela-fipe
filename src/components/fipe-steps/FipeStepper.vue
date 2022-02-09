<template>
  <v-stepper v-model="currentStep">
    <v-stepper-header>
        <template 
            v-for="step in stepTitles"
        >
        <v-stepper-step
            :complete="currentStep > step.step"
            :step="step.step"
            :key="`${step.step}-step`"
        >
            {{ step.title }}
            <v-divider :key="step.step"></v-divider>
        </v-stepper-step>
        
        </template>
    </v-stepper-header>

    <v-stepper-items>

      <v-stepper-content step="1">
        <first-step 
            v-if="currentStep === 1"
            :selectedCategory="selectedCategory"
            @update-is-validated="resolveIsValidatedValue" 
            @update-selected-category="resolveSelectedCategory">
        </first-step>
      </v-stepper-content>

      <v-stepper-content step="2">
        <second-step 
            :selectedCategory="selectedCategory"
            :selectedBrand="selectedBrand"
            @update-is-validated="resolveIsValidatedValue"
            @update-selected-brand="resolveSelectedBrand"
            v-if="currentStep === 2">
        </second-step>
      </v-stepper-content>

      <v-stepper-content step="3">
        <third-step
            :selectedCategory="selectedCategory"
            :selectedBrand="selectedBrand"
            :selectedModel="selectedModel"
            @update-is-validated="resolveIsValidatedValue"
            @update-selected-model="resolveSelectedModel"
            v-if="currentStep === 3">
        </third-step>
      </v-stepper-content>

    </v-stepper-items>


    <div class="actions-buttons">
        <v-btn
            color="secondary"
            @click="previousStep()"
            :disabled="isFirstStep"
        >
            Anterior
        </v-btn>

        <v-btn 
            @click="nextStep()"
            color="primary"
            :disabled="!isLastStep && !isValidated"
            class="float-right"
        >
            Próximo
        </v-btn>
    </div>
  </v-stepper>
</template>

<script>
import FirstStep from './components/FirstStep.vue';
import SecondStep from './components/SecondStep.vue';
import ThirdStep from './components/ThirdStep.vue';

export default {
    name: 'FipeStepper',
    components: {
        FirstStep,
        SecondStep,
        ThirdStep
    },
    data() {
        return {
            currentStep: 1,
            firstStep: 1,
            lastStep: 3,
            isValidated: true,
            selectedCategory: null,
            selectedBrand: [],
            selectedModel: [],
            stepTitles: [
                { title: 'Categoria do veículo', step: 1 },
                { title: 'Marca do veículo', step: 2 },
                { title: 'Modelo do veículo', step: 3 }
            ],
                
        };
    },
    computed: {
        isFirstStep() {
            return this.currentStep === this.firstStep
        },
        isLastStep() {
            return this.currentStep === this.lastStep
        },
    },
    methods: {
        nextStep() {
            this.currentStep++
        },
        previousStep() {
            this.currentStep--
        },
        resolveIsValidatedValue(value) {
            console.log(value)
            this.isValidated = value
        },
        resolveSelectedCategory(value) {
            this.selectedCategory = value
        },
        resolveSelectedBrand(value) {
            this.selectedBrand = value
        },
        resolveSelectedModel(value) {
            this.selectedModel = value
        }
    }
}
</script>

<style>
.actions-buttons {
    padding: 0px 80px 40px 80px;
}
</style>