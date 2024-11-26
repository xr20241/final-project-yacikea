document.addEventListener('DOMContentLoaded', () => {
    const marker = document.querySelector('a-marker');
    const menuItems = document.querySelectorAll('.menu-item');
    let currentObject = null;

    const objectConfigs = {
        cube: {
            geometry: 'primitive: box; width: 1; height: 1; depth: 1;',
            position: '0 0.5 0',
            color: '#4CC3D9'
        },
        sphere: {
            geometry: 'primitive: sphere; radius: 0.5;',
            position: '0 0.5 0',
            color: '#EF2D5E'
        },
        cylinder: {
            geometry: 'primitive: cylinder; radius: 0.5; height: 1;',
            position: '0 0.5 0',
            color: '#FFC65D'
        }
    };

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const modelType = item.dataset.model;
            
            // Supprimer l'objet précédent s'il existe
            if (currentObject) {
                marker.removeChild(currentObject);
            }

            // Créer le nouvel objet
            const config = objectConfigs[modelType];
            const entity = document.createElement('a-entity');
            entity.setAttribute('geometry', config.geometry);
            entity.setAttribute('position', config.position);
            entity.setAttribute('material', `color: ${config.color}`);
            entity.setAttribute('class', 'ar-object');

            // Ajouter l'objet à la scène
            marker.appendChild(entity);
            currentObject = entity;
        });
    });

    // Gestion des erreurs de la caméra
    const scene = document.querySelector('a-scene');
    scene.addEventListener('camera-error', function(error) {
        console.error('Erreur de caméra:', error);
        alert('Erreur lors de l\'accès à la caméra. Veuillez vérifier les permissions.');
    });
}); 