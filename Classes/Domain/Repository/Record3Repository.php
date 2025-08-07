<?php

namespace AutoDudes\Sitepackage\Domain\Repository;

use AutoDudes\Sitepackage\Domain\Model\Record3;
use Doctrine\DBAL\Exception;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class Record3Repository
{
    /**
     * @throws Exception
     */
    public function findAll(): array
    {
        $connection = GeneralUtility::makeInstance(ConnectionPool::class)->getConnectionForTable('tx_t3dd25_record3');
        $queryBuilder = $connection->createQueryBuilder();
        $list = $queryBuilder
            ->select('*')
            ->from('tx_t3dd25_record3')
            ->orderBy('title', 'ASC')
            ->executeQuery()
            ->fetchAllAssociative();
        $result = [];
        foreach ($list as $item) {
            $result[] = Record3::fromArray($item);
        }
        return $result;
    }

}
