import createDataContext from './createDataContext';
import authApi from '../api/auth';
import { getToken } from '../storage/tokenStorage';

const strategyUpdateReducer = (state, action) => {
    switch (action.type) {
        case 'set_strategy' : 
            return { ...state, strategy : action.payload };
        case 'set_name':
            return { ...state, 
                strategy: {
                    ...state.strategy,
                    strategyName: action.payload }
                };
        case 'set_icon':
            return { ...state, 
                strategy: {
                    ...state.strategy,
                    iconid: action.payload }
                };
        case 'set_description':
            return { ...state, 
                strategy: {
                    ...state.strategy,
                    strategyDescription: action.payload }
                };
        case 'set_investment':
            return { ...state, 
                strategy: {
                    ...state.strategy,
                    investment: action.payload }
                };
        case 'set_lastrun':
            return { ...state, 
                strategy: {
                    ...state.strategy,
                    lastRun: action.payload }
                };
        case 'set_userid':
            return  { ...state, 
                strategy: {
                    ...state.strategy,
                    UserID: action.payload }
                };
        case 'set_email':
            return { ...state, 
                strategy: {
                    ...state.strategy,
                    email: action.payload }
                };
        case 'set_dateadded':
            return { ...state, 
                strategy: {
                    ...state.strategy,
                    dateAdded: action.payload }
                };
        case 'set_datemodified':
            return { ...state, 
                strategy: {
                    ...state.strategy,
                    dateModified: action.payload }
                };
        case 'set_status':
            return { ...state, 
                strategy: {
                    ...state.strategy,
                    status: action.payload }
                };
        case 'set_sectors':
            return { ...state, 
                strategy: {
                    ...state.strategy,
                    sectors: action.payload }
                };
        case 'set_meta':
            return { ...state, 
                strategy: {
                    ...state.strategy,
                    strategyMeta: action.payload }
                };
        case 'set_regions':
            return { ...state, 
                strategy: {
                    ...state.strategy,
                 regions: action.payload }
                };
        case 'set_volatility':
            return { ...state, 
                strategy: {
                    ...state.strategy,
                 volatility: action.payload }
                };
        case 'set_strategytypes':
            return {
                ...state,
                strategy: {
                    ...state.strategy,
                    strategyTypes: [
                        ...state.strategy.strategyTypes.slice(0, action.payload.strategyTypeIndex),
                            action.payload.updatedType,
                        ...state.strategy.strategyTypes.slice(action.payload.strategyTypeIndex + 1),
                    ]
                }
            }
        case 'set_assetclassallocations':
            return { ...state, 
                strategy: {
                    ...state.strategy,
                    assetClassAllocations: action.payload }
                };
        case 'set_marketcaps':
            return { ...state, 
                strategy: {
                    ...state.strategy,
                    marketCaps: action.payload }
                };
        case 'set_tickers':
            return { ...state, 
                strategy: {
                    ...state.strategy,
                    tickers: action.payload }
                };
        case 'set_globalspecifications':
            return { ...state, 
                strategy: {
                    ...state.strategy,
                globalSpecifications : action.payload 
                }
            };
        default:
            return state;
    }
};

const setStrategy =  dispatch => async (strategy) => {
    console.log('setting strategy');
    console.log(strategy);
    // delete strategy.analytics;
    // delete strategy.latestActions;
    dispatch({ type: 'set_strategy', payload: strategy });
};

const getStrategyTemplate = dispatch => async (option) => {
    const token = await getToken();
    if (token) {
        try{
          let config = {
            headers: { Authorization: `Bearer ${token}` },
            clearCacheEntry: false
          };
  
          let response = await authApi.get(`/strategytemplate/${option}`, config);
  
          dispatch({ type: 'set_strategy', payload: response.data });
        } catch(err) {
          dispatch({ type: 'add_error', payload: err.data.error });
        }
    } else {
      dispatch({ type: 'add_error', payload: 'No data acess token available' });
    }
  };

const updateName = dispatch => async (name) => {
    dispatch({ type: 'set_name', payload: name });
}

const updateIcon = dispatch => async (iconid) => {
    dispatch({ type: 'set_icon', payload: iconid });
}

const updateDescription = dispatch => async (description) => {
    dispatch({ type: 'set_description', payload: description });
}

const updateInvestment = dispatch => async (investment) => {
    dispatch({ type: 'set_investment', payload: investment });
}

const updateLastRun = dispatch => async (lastRun) => {
    dispatch({ type: 'set_lastrun', payload: lastRun });
}

const updateUserId = dispatch => async (UserId) => {
    dispatch({ type: 'set_userid', payload: UserId });
}

const updateEmail = dispatch => async (email) => {
    dispatch({ type: 'set_email', payload: email });
}

const updateDateAdded = dispatch => async (dateAdded) => {
    dispatch({ type: 'set_dateadded', payload: dateAdded });
}

const updateDateModified = dispatch => async (dateModified) => {
    dispatch({ type: 'set_datemodified', payload: dateModified });
}

const updateStatus = dispatch => async (status) => {
    dispatch({ type: 'set_status', payload: status });
}

const updateSectors = dispatch => async (sectors) => {
    dispatch({ type: 'set_sectors', payload: sectors });
}

const updateMeta = dispatch => async (meta) => {
    dispatch({ type: 'set_meta', payload: meta });
}

const updateRegions = dispatch => async (regions) => {
    dispatch({ type: 'set_regions', payload: regions });
}

const updateVolatility = dispatch => async (volatility) => {
    dispatch({ type: 'set_volatility', payload: volatility });
}

const updateStrategyTypes = dispatch => async (strategyTypeIndex, updatedType) => {
    dispatch({ type: 'set_strategytypes', payload: {strategyTypeIndex, updatedType} });
}

const updateAssetClassAllocations = dispatch => async (assetClassAllocations) => {
    dispatch({ type: 'set_assetclassallocations', payload: assetClassAllocations });
}

const updateMarketCaps = dispatch => async (marketCaps) => {
    dispatch({ type: 'set_marketcaps', payload: marketCaps });
}

const updateTickers = dispatch => async (tickers) => {
    dispatch({ type: 'set_tickers', payload: tickers });
}

const updateGlobalSpecifications = dispatch => async (globalSpecifications) => {
    dispatch({ type: 'set_globalspecifications', payload: globalSpecifications });
}


export const { Context, Provider } = createDataContext(
    strategyUpdateReducer,
    {
        setStrategy, updateName, updateDescription, updateLastRun,
        updateUserId, updateEmail, updateDateAdded, updateDateModified,
        updateStatus, updateSectors, updateMeta, updateRegions,
        updateStrategyTypes, updateAssetClassAllocations, updateMarketCaps,
        updateTickers, updateGlobalSpecifications, getStrategyTemplate,
        updateVolatility, updateIcon, updateInvestment
    },
    { strategy : {} }
);
