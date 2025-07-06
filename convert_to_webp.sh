#!/bin/bash

echo "🔄 Convertidor de imágenes a WebP"
echo "=================================================="

# Crear carpetas de salida
mkdir -p works_webp/WORKS
mkdir -p works_webp/COMMISSIONS
mkdir -p works_webp/EXHIBITIONS

# Contadores
total_converted=0
total_images=0

# Función para convertir imágenes en una carpeta
convert_folder() {
    local input_folder=$1
    local output_folder=$2
    
    echo ""
    echo "📁 Procesando: $input_folder"
    echo "----------------------------------------"
    
    if [ ! -d "$input_folder" ]; then
        echo "❌ Carpeta no encontrada: $input_folder"
        return
    fi
    
    local count=0
    local converted=0
    
    # Procesar archivos JPG, JPEG, PNG
    for img in "$input_folder"/*.{jpg,jpeg,JPG,JPEG,png,PNG}; do
        if [ -f "$img" ]; then
            count=$((count + 1))
            filename=$(basename "$img")
            name_without_ext="${filename%.*}"
            output_path="$output_folder/${name_without_ext}.webp"
            
            echo "Convirtiendo: $filename -> ${name_without_ext}.webp"
            
            if convert "$img" -quality 85 -define webp:lossless=false "$output_path" 2>/dev/null; then
                echo "✅ Convertido: ${name_without_ext}.webp"
                converted=$((converted + 1))
            else
                echo "❌ Error: $filename"
            fi
        fi
    done
    
    echo "✅ $converted/$count imágenes convertidas en $input_folder"
    total_converted=$((total_converted + converted))
    total_images=$((total_images + count))
}

# Convertir cada carpeta
convert_folder "works/WORKS" "works_webp/WORKS"
convert_folder "works/COMMISSIONS" "works_webp/COMMISSIONS"
convert_folder "works/EXHIBITIONS" "works_webp/EXHIBITIONS"

echo ""
echo "🎉 Resumen:"
echo "Total de imágenes procesadas: $total_images"
echo "Total de imágenes convertidas: $total_converted"
echo "Carpetas de salida creadas:"
echo "  - works_webp/WORKS"
echo "  - works_webp/COMMISSIONS"
echo "  - works_webp/EXHIBITIONS"
echo ""
echo "💡 Las imágenes WebP están listas para usar en tu web!"
echo "   Reemplaza las rutas en works.html con las nuevas rutas WebP." 