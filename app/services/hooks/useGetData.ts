import { api } from '../api';

// store
import { useTokenStore } from '../../store/token';

export default function useGetData() {
//export const useGetData = () => {

	const token = useTokenStore.getState().token

	const headers = {
		'X-GLB-Token': token,
    'Content-Type': 'text/plain',
    'Cookie': `GLBID=${token}`,
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

  const getMyTeam = async (id: string) => {
    try {
      const response = await api.get(`/time/id/${id}`)

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

  const getSchemas = async () => {
    try {
      const response = await api.get('/esquemas')

      return response.data
    } catch (error) {
      console.log({ error })
      return { error }
    }
  }

  const getLeagues = async () => {
    try {
      const response = await api.get('/auth/ligas', { headers })

      return response.data
    } catch (error) {
      console.log({ error })
      return { error }
    }
  }

  const getLeagueTeams = async (slug: string) => {
    try {
      const response = await api.get(`/auth/liga/${slug}`, { headers })

      return response.data
    } catch (error) {
      console.log({ error })
      return { error }
    }
  }

  const getScoredAthletes = async () => {
    try {
      const response = await api.get(`/atletas/pontuados`, { headers })

      if (response.status.toString() === "204") {
        return []
      }

      return response.data
    } catch (error) {
      console.log({ error })
      return { error }
    }
  }

  return {
    getTeam,
    getStatusMarket,
    getMyTeam,
    getSchemas,
    getLeagues,
    getLeagueTeams,
    getScoredAthletes
  }
}