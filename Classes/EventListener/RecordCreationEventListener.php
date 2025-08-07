<?php

namespace AutoDudes\Sitepackage\EventListener;

use AutoDudes\Sitepackage\Domain\Repository\Record3Repository;
use Doctrine\DBAL\Exception;
use TYPO3\CMS\Core\Attribute\AsEventListener;

final class RecordCreationEventListener
{
    /**
     * @throws Exception
     */
    #[AsEventListener]
    public function __invoke(\TYPO3\CMS\Core\Domain\Event\RecordCreationEvent $event): void
    {
        $rawRecord = $event->getRawRecord();

        if ($rawRecord->getMainType() === 'tt_content' && $rawRecord->getRecordType() === 't3dd25_record3list') {
            $repository = new Record3Repository();
            $event->setProperty(
                'record3_list',
                $repository->findAll()
            );
        }
    }
}
