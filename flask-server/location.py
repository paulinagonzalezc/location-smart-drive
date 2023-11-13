import requests


def get_current_location():
    try:
        add = requests.get("https://api.ipify.org").text
        url = "https://get.geojs.io/v1/ip/geo/" + add + ".json"
        geo = requests.get(url)
        geo_data = geo.json()
        print(geo_data["city"])
        location = geo_data["city"]
        return location
        # if location.ok:
        #     return location
        # else:
        #     return None
    except Exception as e:
        print(f"Error getting location: {e}")
        return None
