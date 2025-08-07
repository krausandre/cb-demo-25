<?php
defined('TYPO3')  || die('Access denied.');

/***************
 * Add default RTE configuration
 */
$GLOBALS['TYPO3_CONF_VARS']['RTE']['Presets']['sitepackage'] = 'EXT:sitepackage/Configuration/RTE/Default.yaml';

/***************
 * Make Fileadmin prev images bigger
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addUserTSConfig('@import \'EXT:sitepackage/Configuration/user.tsconfig\'');

\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerControllerActions(
    'Sitepackage',
    'SpPlugin',
    [
        \AutoDudes\Sitepackage\Controller\DemoController::class => ['list']
    ],
    [
        \AutoDudes\Sitepackage\Controller\DemoController::class => []
    ]
);
