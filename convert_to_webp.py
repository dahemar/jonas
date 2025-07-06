#!/usr/bin/env python3
"""
Script para convertir todas las imágenes a formato WebP
Optimiza las imágenes para carga web
"""

import os
from PIL import Image
from pathlib import Path
import glob

def convert_to_webp(input_path, output_path, quality=85):
    """Convierte una imagen a formato WebP"""
    try:
        with Image.open(input_path) as img:
            # Convertir a RGB si es necesario (para PNG con transparencia)
            if img.mode in ('RGBA', 'LA', 'P'):
                # Crear fondo blanco para imágenes con transparencia
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Guardar como WebP
            img.save(output_path, 'WEBP', quality=quality, optimize=True)
            return True
    except Exception as e:
        print(f"Error convirtiendo {input_path}: {e}")
        return False

def process_folder(folder_path, output_folder):
    """Procesa todas las imágenes en una carpeta"""
    # Crear carpeta de salida si no existe
    os.makedirs(output_folder, exist_ok=True)
    
    # Extensiones de imagen soportadas
    image_extensions = ['*.jpg', '*.jpeg', '*.JPG', '*.JPEG', '*.png', '*.PNG']
    
    converted_count = 0
    total_count = 0
    
    for ext in image_extensions:
        pattern = os.path.join(folder_path, ext)
        for image_path in glob.glob(pattern):
            total_count += 1
            
            # Obtener nombre del archivo sin extensión
            filename = Path(image_path).stem
            output_path = os.path.join(output_folder, f"{filename}.webp")
            
            print(f"Convirtiendo: {image_path} -> {output_path}")
            
            if convert_to_webp(image_path, output_path):
                converted_count += 1
                print(f"✅ Convertido: {filename}.webp")
            else:
                print(f"❌ Error: {filename}")
    
    return converted_count, total_count

def main():
    print("🔄 Convertidor de imágenes a WebP")
    print("=" * 50)
    
    # Definir carpetas de entrada y salida
    folders = {
        'works/WORKS': 'works_webp/WORKS',
        'works/COMMISSIONS': 'works_webp/COMMISSIONS', 
        'works/EXHIBITIONS': 'works_webp/EXHIBITIONS'
    }
    
    total_converted = 0
    total_images = 0
    
    for input_folder, output_folder in folders.items():
        if os.path.exists(input_folder):
            print(f"\n📁 Procesando: {input_folder}")
            print("-" * 30)
            
            converted, total = process_folder(input_folder, output_folder)
            total_converted += converted
            total_images += total
            
            print(f"✅ {converted}/{total} imágenes convertidas en {input_folder}")
        else:
            print(f"❌ Carpeta no encontrada: {input_folder}")
    
    print(f"\n🎉 Resumen:")
    print(f"Total de imágenes procesadas: {total_images}")
    print(f"Total de imágenes convertidas: {total_converted}")
    print(f"Carpetas de salida creadas:")
    for output_folder in folders.values():
        print(f"  - {output_folder}")
    
    print(f"\n💡 Las imágenes WebP están listas para usar en tu web!")
    print(f"   Reemplaza las rutas en works.html con las nuevas rutas WebP.")

if __name__ == "__main__":
    main() 