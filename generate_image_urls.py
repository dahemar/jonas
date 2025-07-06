#!/usr/bin/env python3
"""
Script para generar URLs de imágenes para Google Sheets
Lee las imágenes de las carpetas works/, commissions/ y exhibitions/
y genera las URLs correspondientes para añadir a Google Sheets
"""

import os
import json
from pathlib import Path

# Configuración
GITHUB_USER = "tu-usuario"  # Cambia por tu usuario de GitHub
REPO_NAME = "tu-repo"       # Cambia por el nombre de tu repositorio
BASE_URL = f"https://{GITHUB_USER}.github.io/{REPO_NAME}"

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

def generate_urls():
    """Genera las URLs para todas las imágenes"""
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
            image_url = f"{BASE_URL}/works/{section}/{image}"
            results[section].append({
                'filename': image,
                'url': image_url,
                'section': section
            })
    
    return results

def print_for_google_sheets():
    """Imprime las URLs en formato para copiar a Google Sheets"""
    results = generate_urls()
    
    print("=== URLs para Google Sheets ===\n")
    print("Copia estas filas a tu Google Sheet:\n")
    print("Date | Title | Content | Image URL | Section")
    print("-----|-------|---------|-----------|--------")
    
    for section, images in results.items():
        for img in images:
            # Generar título basado en el nombre del archivo
            title = Path(img['filename']).stem.replace('_', ' ').title()
            
            print(f" | {title} | Descripción | {img['url']} | {section}")

def save_to_json():
    """Guarda los resultados en un archivo JSON"""
    results = generate_urls()
    
    with open('image_urls.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print("URLs guardadas en 'image_urls.json'")

def main():
    print("🔍 Generador de URLs de imágenes para Google Sheets")
    print("=" * 50)
    
    # Verificar que las carpetas existen
    works_folder = "works"
    if not os.path.exists(works_folder):
        print(f"❌ Error: No se encuentra la carpeta '{works_folder}'")
        return
    
    print(f"✅ Carpeta '{works_folder}' encontrada")
    
    # Mostrar estadísticas
    results = generate_urls()
    total_images = sum(len(images) for images in results.values())
    
    print(f"\n📊 Estadísticas:")
    for section, images in results.items():
        print(f"   {section}: {len(images)} imágenes")
    print(f"   Total: {total_images} imágenes")
    
    # Mostrar URLs para Google Sheets
    print_for_google_sheets()
    
    # Guardar en JSON
    save_to_json()
    
    print(f"\n💡 Instrucciones:")
    print(f"1. Cambia 'tu-usuario' y 'tu-repo' en el script por tus datos reales")
    print(f"2. Copia las URLs generadas a tu Google Sheet")
    print(f"3. Añade títulos y descripciones personalizados")

if __name__ == "__main__":
    main() 