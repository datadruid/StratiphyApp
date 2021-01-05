export function AddStrategy(strategyTypes, strategyType, updateStrategyTypes, option, setting) {
    let index = strategyTypes.findIndex(x => x.typeName === strategyType);
    let updatedType = {
        setting: setting,
        specifications: {
            periodicities: option.periodicities,
            periods: option.periods,
            weightings: option.weightings
        },
        typeName: strategyType
    }
    updateStrategyTypes(index, updatedType);
};


export function RemoveStrategy(strategyTypes, strategyType, updateStrategyTypes) {
    let index = strategyTypes.findIndex(x => x.typeName === strategyType);
    let updatedType = {
        setting: 'none',
        specifications: {},
        typeName: strategyType
    }
    updateStrategyTypes(index, updatedType);
};

export function FindStrategy(strategyTypes, strategyTypeId) {
    let index = strategyTypes.find(x => x.id === strategyTypeId);
    return index;
};