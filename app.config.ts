export default defineAppConfig({
    ui: {
        // Настройки
        strategy: 'override',
        primary: 'red',
        gray: 'cool',
        icons: {
            dynamic: true,
        },
        // Кастомизация компонентов
        button: {
            padding: {
                '2xs': 'px-2 py-1',
                xs: 'px-2.5 py-1.5',
                sm: 'px-2.5 py-1.5',
                md: 'px-3 py-2',
                lg: 'px-3.5 py-2.5',
                xl: 'px-6 py-2.5'
            },
            default: {
                size: 'xl',
                color: 'primary',
                variant: 'solid',
                loadingIcon: 'i-octicon-sync-24',
            }
        },
        input: {
            default: {
                loadingIcon: 'i-octicon-sync-24'
            }
        },
        select: {
            default: {
                loadingIcon: 'i-octicon-sync-24',
                trailingIcon: 'i-octicon-chevron-down-24'
            }
        },
        selectMenu: {
            default: {
                selectedIcon: 'i-octicon-check-24'
            }
        },
        notifications: {
            // Show toasts at the top right of the screen
            position: 'top-0 end-0'
        },
        notification: {
            default: {
                closeButton: {
                    icon: 'i-octicon-x-24'
                }
            }
        },
        commandPalette: {
            default: {
                icon: 'i-octicon-search-24',
                loadingIcon: 'i-octicon-sync-24',
                selectedIcon: 'i-octicon-check-24',
                emptyState: {
                    icon: 'i-octicon-search-24'
                }
            }
        },
        table: {
            default: {
                sortAscIcon: 'i-octicon-sort-asc-24',
                sortDescIcon: 'i-octicon-sort-desc-24',
                sortButton: {
                    icon: 'i-octicon-arrow-switch-24'
                },
                loadingState: {
                    icon: 'i-octicon-sync-24'
                },
                emptyState: {
                    icon: 'i-octicon-database-24'
                }
            }
        },
        pagination: {
            default: {
                firstButton: {
                    icon: 'i-octicon-chevron-left-24'
                },
                prevButton: {
                    icon: 'i-octicon-arrow-left-24'
                },
                nextButton: {
                    icon: 'i-octicon-arrow-right-24'
                },
                lastButton: {
                    icon: 'i-octicon-chevron-right-24'
                }
            }
        },
        accordion: {
            default: {
                openIcon: 'i-octicon-chevron-down-24'
            }
        },
        breadcrumb: {
            default: {
                divider: 'i-octicon-chevron-right-24'
            }
        },
        container: {
            base: 'mx-auto max-w-8xl',
            padding: 'px-3',
            constrained: 'max-w-8xl'
        }
    }
})