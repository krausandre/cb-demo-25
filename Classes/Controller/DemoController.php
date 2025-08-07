<?php

namespace AutoDudes\Sitepackage\Controller;

use AutoDudes\Sitepackage\Domain\Repository\Record3Repository;
use Doctrine\DBAL\Exception;
use Psr\Http\Message\ResponseInterface;
use TYPO3\CMS\Extbase\Mvc\Controller\ActionController;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;

class DemoController extends ActionController
{
    /**
     * @throws Exception
     */
    public function listAction(): ResponseInterface
    {
        /** @var ContentObjectRenderer $contentObject */
        $contentObject = $this->request->getAttribute('currentContentObject');
        $dataFromTypoScript = $contentObject->data;

        $this->view->assign('data', $dataFromTypoScript);
        $repository = new Record3Repository();
        $this->view->assign('myRecords', $repository->findAll());

        return $this->htmlResponse();
    }

}
