'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { riyadhDistricts, getDistrictColor, getPriceLabel, District } from '@/lib/data/riyadh-districts';
import { TrendingUp, TrendingDown, Minus, Star, MapPin, Home, DollarSign } from 'lucide-react';

// إصلاح أيقونات Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface RiyadhMapProps {
  onDistrictHover?: (district: District | null) => void;
  selectedDistrict?: District | null;
}

function MapController({ selectedDistrict }: { selectedDistrict: District | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedDistrict) {
      map.flyTo([selectedDistrict.lat, selectedDistrict.lng], 14, {
        duration: 1.5,
      });
    }
  }, [selectedDistrict, map]);
  
  return null;
}

export default function RiyadhMap({ onDistrictHover, selectedDistrict }: RiyadhMapProps) {
  const [mounted, setMounted] = useState(false);
  const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل الخريطة...</p>
        </div>
      </div>
    );
  }

  const handleMarkerMouseOver = (district: District) => {
    setHoveredDistrict(district);
    onDistrictHover?.(district);
  };

  const handleMarkerMouseOut = () => {
    setHoveredDistrict(null);
    onDistrictHover?.(null);
  };

  // إنشاء أيقونة مخصصة لكل حي
  const createCustomIcon = (district: District, isHovered: boolean) => {
    const color = getDistrictColor(district.avgPrice);
    const size = isHovered ? 40 : 30;
    
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: ${isHovered ? '14px' : '12px'};
          transition: all 0.3s ease;
          cursor: pointer;
        ">
          ${district.properties}
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  return (
    <MapContainer
      center={[24.7136, 46.6753]}
      zoom={11}
      style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
      zoomControl={true}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapController selectedDistrict={selectedDistrict} />
      
      {riyadhDistricts.map((district) => {
        const isHovered = hoveredDistrict?.id === district.id || selectedDistrict?.id === district.id;
        
        return (
          <div key={district.id}>
            {/* دائرة ملونة حول الحي */}
            <Circle
              center={[district.lat, district.lng]}
              radius={800}
              pathOptions={{
                color: getDistrictColor(district.avgPrice),
                fillColor: getDistrictColor(district.avgPrice),
                fillOpacity: isHovered ? 0.3 : 0.15,
                weight: isHovered ? 3 : 1,
              }}
            />
            
            {/* علامة الحي */}
            <Marker
              position={[district.lat, district.lng]}
              icon={createCustomIcon(district, isHovered)}
              eventHandlers={{
                mouseover: () => handleMarkerMouseOver(district),
                mouseout: handleMarkerMouseOut,
              }}
            >
              <Popup className="custom-popup" minWidth={300}>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{district.name}</h3>
                      <p className="text-sm text-gray-500">{district.nameEn}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-gray-900">{district.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-purple-600" />
                        <span className="text-sm text-gray-600">متوسط سعر المتر</span>
                      </div>
                      <span className="text-lg font-bold text-purple-600">
                        {district.avgPrice.toLocaleString('ar-SA')} ر.س
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Home className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-gray-600">عدد العقارات</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">{district.properties}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">النطاق السعري</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {district.priceRange.min.toLocaleString('ar-SA')} - {district.priceRange.max.toLocaleString('ar-SA')} ر.س
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm text-gray-600">اتجاه السوق</span>
                      <div className="flex items-center gap-1">
                        {district.trend === 'up' && (
                          <>
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-semibold text-green-600">
                              +{district.trendPercentage}%
                            </span>
                          </>
                        )}
                        {district.trend === 'down' && (
                          <>
                            <TrendingDown className="w-4 h-4 text-red-600" />
                            <span className="text-sm font-semibold text-red-600">
                              -{district.trendPercentage}%
                            </span>
                          </>
                        )}
                        {district.trend === 'stable' && (
                          <>
                            <Minus className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-semibold text-gray-600">مستقر</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">المرافق المتوفرة:</p>
                    <div className="flex flex-wrap gap-2">
                      {district.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{district.description}</p>
                  
                  <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                    عرض العقارات المتاحة
                  </button>
                </div>
              </Popup>
            </Marker>
          </div>
        );
      })}
    </MapContainer>
  );
}

