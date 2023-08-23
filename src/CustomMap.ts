export interface Mappable {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  popupContent(): string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(htmlElementId: string) {
    const mapDiv = document.getElementById(htmlElementId) as HTMLElement;
    const map = new google.maps.Map(mapDiv, {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0
      }
    });
    this.googleMap = map;
  }

  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: mappable.location,
      label: mappable.name,
      title: mappable.name
    });

    const infoWindow = new google.maps.InfoWindow({
      content: mappable.popupContent()
    });

    marker.addListener('click', () => {
      infoWindow.open(this.googleMap, marker);
    });
  }
}
