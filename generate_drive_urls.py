#!/usr/bin/env python3
"""
Script para generar URLs de Google Drive para Google Sheets
Lee las imágenes de las carpetas works/, commissions/ y exhibitions/
y genera las URLs de Google Drive correspondientes
"""

import os
import json
from pathlib import Path

# Configuración
DRIVE_FOLDER_ID = "TU_FOLDER_ID"  # ID de la carpeta de Google Drive donde subirás las imágenes
BASE_DRIVE_URL = f"https://drive.google.com/uc?id="

# Extensiones de imagen soportadas
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'}

def get_image_files(folder_path):
    """Obtiene todos los archivos de imagen de una carpeta"""
    images = []
    if os.path.exists(folder_path):
        for file in os.listdir(folder_path):
            if Path(file).suffix.lower() in IMAGE_EXTENSIONS:
                images.append(file)
    return sorted(images)

def generate_drive_urls():
    """Genera las URLs para todas las imágenes (placeholder para Google Drive)"""
    results = {
        'works': [],
        'commissions': [],
        'exhibitions': []
    }
    
    # Procesar cada carpeta
    for section in ['works', 'commissions', 'exhibitions']:
        folder_path = f"works/{section}"
        images = get_image_files(folder_path)
        
        for image in images:
            # Placeholder para la URL de Google Drive
            # Necesitarás reemplazar FILE_ID con el ID real de cada archivo
            drive_url = f"{BASE_DRIVE_URL}FILE_ID"
            results[section].append({
                'filename': image,
                'url': drive_url,
                'section': section,
                'needs_file_id': True
            })
    
    return results

def print_for_google_sheets():
    """Imprime las URLs en formato para copiar a Google Sheets"""
    results = generate_drive_urls()
    
    print("=== URLs para Google Sheets (Google Drive) ===\n")
    print("⚠️  INSTRUCCIONES IMPORTANTES:")
    print("1. Sube las imágenes a Google Drive")
    print("2. Obtén el ID de cada archivo de la URL de Google Drive")
    print("3. Reemplaza 'FILE_ID' en las URLs generadas\n")
    print("Copia estas filas a tu Google Sheet:\n")
    print("Date | Title | Content | Image URL | Section")
    print("-----|-------|---------|-----------|--------")
    
    for section, images in results.items():
        for img in images:
            # Generar título basado en el nombre del archivo
            title = Path(img['filename']).stem.replace('_', ' ').title()
            
            print(f" | {title} | Descripción | {img['url']} | {section}")

def print_instructions():
    """Imprime instrucciones detalladas para Google Drive"""
    print("\n" + "="*60)
    print("📋 INSTRUCCIONES PARA GOOGLE DRIVE")
    print("="*60)
    print("\n1. 📁 CREAR CARPETA EN GOOGLE DRIVE:")
    print("   - Ve a drive.google.com")
    print("   - Crea una carpeta llamada 'jonas-website-images'")
    print("   - Copia el ID de la carpeta de la URL")
    print("   - Ejemplo: https://drive.google.com/drive/folders/1ABC123...")
    print("   - El ID es: 1ABC123...")
    
    print("\n2. 📤 SUBIR IMÁGENES:")
    print("   - Sube todas las imágenes de la carpeta 'works/' a Google Drive")
    print("   - Puedes mantener la estructura de carpetas (works/commissions/exhibitions)")
    
    print("\n3. 🔗 OBTENER URLs:")
    print("   - Haz clic derecho en cada imagen")
    print("   - Selecciona 'Obtener enlace'")
    print("   - Copia la URL")
    print("   - Formato: https://drive.google.com/file/d/FILE_ID/view")
    print("   - El FILE_ID es la parte entre /d/ y /view")
    
    print("\n4. 📝 ACTUALIZAR GOOGLE SHEETS:")
    print("   - Reemplaza 'FILE_ID' en las URLs generadas")
    print("   - Usa el formato: https://drive.google.com/uc?id=FILE_ID")
    
    print("\n5. 🔒 CONFIGURAR PERMISOS:")
    print("   - Asegúrate de que las imágenes sean 'Cualquier persona con el enlace puede ver'")
    print("   - Esto es necesario para que se muestren en tu web")

def save_to_json():
    """Guarda los resultados en un archivo JSON"""
    results = generate_drive_urls()
    
    with open('drive_image_urls.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print("URLs guardadas en 'drive_image_urls.json'")

def main():
    print("🔍 Generador de URLs de Google Drive para Google Sheets")
    print("=" * 60)
    
    # Verificar que las carpetas existen
    works_folder = "works"
    if not os.path.exists(works_folder):
        print(f"❌ Error: No se encuentra la carpeta '{works_folder}'")
        return
    
    print(f"✅ Carpeta '{works_folder}' encontrada")
    
    # Mostrar estadísticas
    results = generate_drive_urls()
    total_images = sum(len(images) for images in results.values())
    
    print(f"\n📊 Estadísticas:")
    for section, images in results.items():
        print(f"   {section}: {len(images)} imágenes")
    print(f"   Total: {total_images} imágenes")
    
    # Mostrar instrucciones
    print_instructions()
    
    # Mostrar URLs para Google Sheets
    print_for_google_sheets()
    
    # Guardar en JSON
    save_to_json()
    
    print(f"\n💡 Próximos pasos:")
    print(f"1. Sigue las instrucciones de Google Drive arriba")
    print(f"2. Reemplaza los FILE_ID en las URLs")
    print(f"3. Copia las URLs actualizadas a tu Google Sheet")

if __name__ == "__main__":
    main() 