export const spanishMessages = {
    ra: {
        action: {
            add_filter: 'Agregar filtro',
            add: 'Agregar',
            back: 'Volver',
            bulk_actions: '1 item seleccionado |||| %{smart_count} items seleccionados',
            cancel: 'Cancel',
            clear_array_input: 'Vaciar lista',
            clear_input_value: 'Elinimar valor',
            clone: 'Clonar',
            confirm: 'Confirmar',
            create: 'Crear',
            create_item: 'Crear %{item}',
            delete: 'Eliminar',
            edit: 'Editar',
            export: 'Exportar',
            list: 'Lista',
            refresh: 'Volver a cargar',
            remove_filter: 'Eliminar este filtro ',
            remove_all_filters: 'Eliminar todos los filtros',
            remove: 'Eliminar',
            save: 'Salvar',
            search: 'Buscar',
            select_all: 'Seleccionar todo',
            select_row: 'Selecionar esta fila',
            show: 'Mostrar',
            sort: 'Ordenar',
            undo: 'Deshacer',
            unselect: 'Deseleccionar',
            expand: 'Expandir',
            close: 'Cerrar',
            open_menu: 'Abrir menu',
            close_menu: 'Cerrar menu',
            update: 'Actualizar',
            move_up: 'Mover hacia arriba',
            move_down: 'Mover hacia abajo',
            open: 'Abrir',
            toggle_theme: 'Cambiar tema',
            select_columns: 'Columnas',
            update_application: 'Actualizar aplicación',
        },
        boolean: {
            true: 'Si',
            false: 'No',
            null: ' ',
        },
        page: {
            create: 'Crear %{name}',
            dashboard: 'Tablero',
            edit: '%{nombre} %{recordRepresentation}',
            error: 'Algó salió mal',
            list: '%{name}',
            loading: 'Cargando',
            not_found: 'No encontrado',
            show: '%{nombre} %{recordRepresentation}',
            empty: 'No %{name} aún.',
            invite: '¿Quieres agregar uno?',
        },
        input: {
            file: {
                upload_several:
                    'Arrastra algunos archivos para subirlos, o haz clic para seleccionar uno.',
                upload_single: 'Arrastra un archivo para subirlo, o haz clic para seleccionarlo.',
            },
            image: {
                upload_several:
                    'Arrastra algunas imágenes para subirlas, o haz clic para seleccionar una.',
                upload_single:
                    'Arrastra una imagen para subirla, o haz clic para seleccionarla.',
            },
            references: {
                all_missing: 'No se pudieron encontrar datos de referencias asociadas.',
                many_missing:
                    'Al menos una de las referencias asociadas ya no parece estar disponible.',
                single_missing:
                    'La referencia asociada ya no parece estar disponible.',
            },
            password: {
                toggle_visible: 'Ocultar contraseña ',
                toggle_hidden: 'Mostrar contraseña',
            },
        },
        message: {
            about: 'Acerca de',
            are_you_sure: '¿Estás seguro?',
            auth_error:
                'No se pudo iniciar sesión, por favor intente nuevamente',
            bulk_delete_content:
                '¿Estás seguro que deseas eliminar este %{name}? |||| ¿Estás seguro que deseas eliminar estos %{smart_count} elementos?',
            bulk_delete_title:
                'Eliminar %{name} |||| Eliminar %{smart_count} %{name}',
            bulk_update_content:
                '¿Estás seguro que deseas actualizar este %{name}? |||| ¿Estás seguro que deseas actualizar estos %{smart_count} elementos?',
            bulk_update_title:
                'Actualizar %{name} |||| Actualizar %{smart_count} %{name}',
            clear_array_input: '¿Estás seguro que deseas eliminar todos los elementos?',
            delete_content: '¿Estás seguro que deseas eliminar este elemento?',
            delete_title: 'Eliminar %{name} #%{id}',
            details: 'Detalles',
            error:
                "Ha ocurrido un error y tu solicitud no se ha completado.",

            invalid_form: 'El formulario no es válido. Por favor verifica los errores',
            loading: 'La página está cargando, solo un momento por favor',
            no: 'No',
            not_found:
                'O has ingresado una URL incorrecta, o has seguido un enlace incorrecto.',
            yes: 'Si',
            unsaved_changes:
                "Algunos de tus cambios no se han guardado. ¿Estás seguro que deseas ignorarlos?",
        },
        navigation: {
            no_results: 'No se encontraron resultados',
            no_more_results:
                'La página número %{page} está fuera de los límites. Intenta la página anterior.',
            page_out_of_boundaries: 'La página número %{page} está fuera de los límites',
            page_out_from_end: 'No se puede ir después de la última página',
            page_out_from_begin: 'No se puede ir antes de la primera página',
            page_range_info: '%{offsetBegin}-%{offsetEnd} a %{total}',
            partial_page_range_info:
                '%{offsetBegin}-%{offsetEnd} a más de %{offsetEnd}',
            current_page: 'Página %{page}',
            page: 'Ir a la página%{page}',
            first: 'Ir a la página principal',
            last: 'Ir a la última página',
            next: 'Siguiente',
            previous: 'página anterior',
            page_rows_per_page: 'Filas por página',
            skip_nav: 'Saltar a contenido',
        },
        sort: {
            sort_by: 'Ordenar por%{field} %{order}',
            ASC: 'ascendente',
            DESC: 'descendente',
        },
        auth: {
            auth_check_error: 'Por favor inicia sesión para continuar',
            user_menu: 'Perfil',
            username: 'Usuario',
            password: 'Contraseña',
            sign_in: 'Iniciar sesión',
            sign_in_error: 'La autenticación falló, por favor intente nuevamente',
            logout: 'Cerrar sesión',
        },
        notification: {
            updated: 'Elemento actualizado |||| %{smart_count} elementos actualizados',
            created: 'Elemento creado',
            deleted: 'Elemento eliminado |||| %{smart_count} elementos eliminados',
            bad_item: 'Elemento incorrecto',
            item_doesnt_exist: 'El elemento no existe',
            http_error: 'Error de comunicación con el servidor',
            data_provider_error:
                'Error en el proveedor de datos. Por favor, verifica la consola para más detalles.',
            i18n_error:
                'No se pudo cargar la traducción para el idioma especificado',
            canceled: 'Acción cancelada',
            logged_out: 'Tu sesión ha finalizado, por favor vuelve a conectarte.',
            not_authorized: "No estás autorizado para acceder a esta página",
            application_update_available: 'Nueva versión disponible. Por favor actualiza la página',
        },
        validation: {
            required: 'Requerido',
            minLength: 'Debe tener al menos %{min} caracteres',
            maxLength: 'Debe tener %{max} caracteres o menos',
            minValue: 'Debe ser al menos %{min}',
            maxValue: 'Debe ser %{max} o menos',
            number: 'Debe ser un número',
            email: 'Debe ser un correo electrónico válido',
            oneOf: 'Debe ser uno de: %{options}',
            regex: 'Debe tener el formato (regexp): %{pattern}',
            unique: 'Debe ser único',
        },
        saved_queries: {
            label: 'Filtros guardados',
            query_name: 'Nombre del filtro',
            new_label: 'Guardar filtro actual',
            new_dialog_title: 'Guardar filtro actual',
            remove_label: 'Eliminar filtro guardado',
            remove_label_with_name: 'Eliminar filtro guardado "%{name}"',
            remove_dialog_title: 'Eliminar filtro guardado',
            remove_message:
                '¿Estás seguro que deseas eliminar este filtro guardado?',
            help: 'Para guardar un filtro, ingresa un nombre y haz clic en Guardar',
        },
        configurable: {
            customize: 'Personalizar',
            configureMode: 'Configurar esta págia',
            inspector: {
                title: 'Inspeccionar',
                content: 'Contenido',
                reset: 'Restablecer',
                hideAll: 'Ocultar todo',
                showAll: 'Mostrar todo',
            },
            Datagrid: {
                title: 'Lista',
                unlabeled: 'Columna %{index}',
            },
            SimpleForm: {
                title: 'Formulario',
                unlabeled: 'Campo %{name}',
            },
            SimpleList: {
                title: 'Lista',
                primaryText: 'Texto principal',
                secondaryText: 'Texto secundario',
                tertiaryText: 'Texto terciario',
            },
        },
    },
};

let messages = spanishMessages;

let locale = 'esp';

export const i18nProvider = {
    translate: key => lodashGet(messages, key),
    changeLocale: newLocale => {
        messages = spanishMessages;
        locale = newLocale;
        return Promise.resolve();
    },
    getLocale: () => locale
};