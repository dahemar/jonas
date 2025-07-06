#!/bin/bash

echo "🔄 Convertidor de imágenes de blog a WebP"
echo "=========================================="

# Crear carpeta de salida
mkdir -p blog_webp

# Contadores
total_converted=0
total_images=0

echo ""
echo "📁 Procesando: blog"
echo "----------------------------------------"

# Procesar archivos JPG, JPEG, PNG
for img in blog/*.{jpg,jpeg,JPG,JPEG,png,PNG}; do
    if [ -f "$img" ]; then
        total_images=$((total_images + 1))
        filename=$(basename "$img")
        name_without_ext="${filename%.*}"
        output_path="blog_webp/${name_without_ext}.webp"
        
        echo "Convirtiendo: $filename -> ${name_without_ext}.webp"
        
        if convert "$img" -quality 85 -define webp:lossless=false "$output_path" 2>/dev/null; then
            echo "✅ Convertido: ${name_without_ext}.webp"
            total_converted=$((total_converted + 1))
        else
            echo "❌ Error: $filename"
        fi
    fi
done

echo "✅ $total_converted/$total_images imágenes convertidas en blog"

echo ""
echo "🎉 Resumen:"
echo "Total de imágenes procesadas: $total_images"
echo "Total de imágenes convertidas: $total_converted"
echo "Carpeta de salida creada:"
echo "  - blog_webp"
echo ""
echo "💡 Las imágenes WebP están listas para usar en tu web!"
echo "   Reemplaza las rutas en index.html con las nuevas rutas WebP." 