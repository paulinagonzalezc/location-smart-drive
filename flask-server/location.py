import geocoder


def get_current_location():
    try:
        # Use Geocoder to get the current location
        location = geocoder.ip("me")
        if location.ok:
            return location.city
        else:
            return None
    except Exception as e:
        print(f"Error getting location: {e}")
        return None
