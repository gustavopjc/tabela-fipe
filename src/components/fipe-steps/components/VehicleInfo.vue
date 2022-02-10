<template>
    <div class="vehicle-informations">
        <div class="info-item">
            <b>Código Fipe:</b> {{ vehicleInfo.CodigoFipe }}
        </div>
        <div class="info-item">
            <b>Ano modelo:</b> {{ vehicleInfo.AnoModelo }}
        </div>
        <div class="info-item">
            <b>Combustível:</b> {{ vehicleInfo.Combustivel }}
        </div>
        <div class="info-item">
            <b>Marca:</b> {{ vehicleInfo.Marca }}
        </div>
        <div class="info-item">
            <b>Mês de referência:</b> {{ vehicleInfo.MesReferencia }}
        </div>
        <div class="info-item">
            <b>Modelo:</b> {{ vehicleInfo.Modelo }}
        </div>
        <div class="info-item">
            <b>Sigla Combustível:</b> {{ vehicleInfo.SiglaCombustivel }}
        </div>
        <div class="info-item">
            <b>Tipo do veículo:</b> {{ vehicleInfo.TipoVeiculo }}
        </div>
        <div class="info-item">
            <b>Valor:</b> {{ vehicleInfo.Valor }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'VehicleInfo',
    props: {
        vehicleInfo: {
            required: true,
            type: Object
        }
    }
}
</script>

<style>
.vehicle-informations {
    margin-top: 20px;
    font-size: 1.05rem;
}

.vehicle-informations > div {
    margin-top: 10px;
}
</style>