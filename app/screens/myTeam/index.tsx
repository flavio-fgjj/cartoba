import { useEffect, useState } from 'react';
import {Image, View} from 'react-native';

// hooks
import useGetData from '@services/hooks/useGetData';

// styles
import {styles} from './styles';

// assets
import campinho from '../../assets/campinho-sem-borda.png';
import logo from '../../assets/logo.png';

// components
import Loader from '@components/Loader';
import { MyTeam } from '../../model/myTeam/MyTeam';

// store
import { useUserStore } from '@store/user';
import { User } from 'app/model/User';
import { Atleta } from 'app/model/Atleta';

// enum
import { Positions } from 'app/utils/positions';

export default function MyTeamScreen() {
	const { getMyTeam } = useGetData();

	const user: User = useUserStore(state => state.user);

	const [team, setTeam] = useState<MyTeam>();
	const [loading, setLoading] = useState(true);

	const callGetData = async () => {
    const teamResponse = await getMyTeam(user.idTeam);
    
    if (!teamResponse.error) {
      setTeam(teamResponse);

			console.log(teamResponse.atletas)
			teamResponse
				.atletas
				.sort((a: Atleta, b: Atleta) => {
          const nameA = a.posicao_id
          const nameB = b.posicao_id
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        })
				.forEach((x: Atleta) => {
					console.log(x.apelido,x.posicao_id)
					console.log(Positions.Goleiro)
					if (x.posicao_id == Positions.Goleiro) {
						console.log('golelão')
					}
				})
			
      setLoading(false);
    }
  };

	useEffect(()=> {
    callGetData();
  }, []);

	if (loading) {
    return <Loader />
  }

	return (
		<View style={styles.team}>
			<Image source={campinho} style={styles.backgroundImg}/>
			<View style={styles.lineForward}>
				<Image source={logo} style={styles.player}/>
				<Image source={logo} style={styles.player}/>
				<Image source={logo} style={styles.player}/>
			</View>
			<View style={styles.lineMiddle}>
				<Image source={logo} style={styles.player}/>
				<Image source={logo} style={styles.player}/>
				<Image source={logo} style={styles.player}/>
			</View>
			<View style={styles.lineBack}>
				<Image source={logo} style={styles.player}/>
				<Image source={logo} style={styles.player}/>
				<Image source={logo} style={styles.player}/>
				<Image source={logo} style={styles.player}/>
			</View>
			<View style={styles.lineGoalkeeper}>
				<View style={{position: 'absolute'}}>
					<Image source={logo} style={styles.coach}/>
				</View>
				<View style={{width: '100%', alignItems: 'center', marginTop: 10}}>
					<Image source={logo} style={styles.goalkeeper}/>
				</View>
			</View>
		</View>
	);
}