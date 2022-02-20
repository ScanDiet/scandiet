import {AsyncStorage} from "@react-native-async-storage/async-storage";

export const _storeData = async (user) => {
        try {
            await AsyncStorage.setItem(
                'USER',
                'ICI CA VA MAL'
            );
        } catch (error) {
            // Error saving data
        }
};

