import {View} from 'react-native';

import {MyButton} from '@components/MyButton';
import {styles} from './styles';

export default function MyTeam() {
    function signOut() {
        
    }

    return (
        <View style={styles.container}>
           <MyButton onPress={(signOut)} title="Sair" />
        </View>
    );
}