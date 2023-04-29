import { api } from '../api';

// store
import { useTokenStore } from '../../store/token';

export default function useGetData() {
//export const useGetData = () => {

	const token = useTokenStore.getState().token

	const headers = {
		'X-GLB-Token': token,
	}

  const getTeam = async () => {
    try {
      const response = await api.get('/auth/time', { headers })

      return response.data
    } catch (error) {
      console.log({ error })
      return { error }
    }
  }

	const getStatusMarket = async () => {
    try {
      const response = await api.get('/mercado/status', { headers })

      return response.data
    } catch (error) {
      console.log({ error })
      return { error }
    }
  }

  return {
    getTeam,
    getStatusMarket,
  }
}