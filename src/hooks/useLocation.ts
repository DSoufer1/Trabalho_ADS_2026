import { useCallback, useState } from 'react';
import * as Location from 'expo-location';

export interface CapturedLocation {
  latitude: number;
  longitude: number;
  address: string | null;
}

export interface LocationResult {
  location?: CapturedLocation;
  error?: string;
}

/** Requests permission and captures the current GPS position + a readable address. */
export function useLocation() {
  const [loading, setLoading] = useState(false);

  const capture = useCallback(async (): Promise<LocationResult> => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return { error: 'Permissão de localização negada. Você pode salvar sem a localização.' };
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      let address: string | null = null;
      try {
        const places = await Location.reverseGeocodeAsync({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        const place = places[0];
        if (place) {
          address =
            [place.street, place.name, place.district, place.city, place.region]
              .filter(Boolean)
              .join(', ') || null;
        }
      } catch {
        // Reverse geocoding is best-effort; coordinates are still saved.
      }

      return {
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          address,
        },
      };
    } catch {
      return { error: 'Não foi possível obter a localização. Tente novamente.' };
    } finally {
      setLoading(false);
    }
  }, []);

  return { capture, loading };
}
