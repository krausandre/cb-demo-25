<?php

/**
 * Extension Manager/Repository config file for ext "sitepackage".
 */
$EM_CONF['sitepackage'] = [
    'title' => 'Sitepackage',
    'description' => 'Basic configuration for TYPO3 installation.',
    'category' => 'templates',
    'constraints' => [
        'depends' => [
            'typo3' => '12.0.0-12.9.99',
            'rte_ckeditor' => '8.7.0-12.9.99',
            'bootstrap_package' => '14.0.0-14.99.99',
            'cc_image' => '1.1.0-2.9.99'
        ],
        'conflicts' => [
        ],
    ],
    'autoload' => [
        'psr-4' => [
            'AutoDudes\\Sitepackage\\' => 'Classes'
        ],
    ],
    'state' => 'stable',
    'uploadfolder' => 0,
    'createDirs' => '',
    'clearCacheOnLoad' => 1,
    'author' => 'Andre Kraus, Manuel Schnabel',
    'author_email' => 'service@autodudes.de',
    'author_company' => 'AutoDudes GbR',
    'version' => '12.4.1',
];
