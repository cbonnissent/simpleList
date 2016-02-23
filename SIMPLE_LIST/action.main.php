<?php

function main(Action &$action) {

    $usage = new ActionUsage($action);

    $usage->setStrictMode(false);
    $usage->verify(true);

    $action->lay->eSet("search_name", ApplicationParameterManager::getParameterValue(ApplicationParameterManager::CURRENT_APPLICATION, "SEARCH_NAME"));
    $action->lay->eSet("WS", \ApplicationParameterManager::getParameterValue("CORE", "WVERSION"));

}